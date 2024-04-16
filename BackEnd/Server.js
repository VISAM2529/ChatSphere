const express = require("express")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const mongoose = require("mongoose")
const {Server} = require("socket.io")
const {createServer} = require("http")
const connectDB = require("./Database/db")
const UserSchema = require("./Database/Users")
const bodyParser = require('body-parser');
const FriendSchema = require("./Database/Friends")
const ChatHistory = require("./Database/ChatHistory")
const UploadSchema = require("./Database/Upload")
const app = express()
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended:false}))
const multer  = require('multer')
const current = Date.now()
cloudinary.config({
    cloud_name:"dqfum2awz",
    api_key:"414121961287831",
    api_secret:"ZPVgSbTHWoc4-Ck0gOSqSuMwois"
  })
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,'./FrontEnd/chat/src/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, current +"-"+ file.originalname)
//     }
//   })

// const upload = multer({ storage: storage })
const upload = multer({ dest: './FrontEnd/chat/src/uploads/' });
app.use(cors())
app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://chatsphere-sg.netlify.app",
        credentials:true
    }
})
const SocketUserMap = new Map()
const UserSocketMap = new Map()
io.on("connection",(socket)=>{
    socket.on("setUsername",(username)=>{
        SocketUserMap.set(socket.id,username)
        UserSocketMap.set(username,socket.id)
    })
    console.log("ID : ",socket.id)
    socket.on("message",(msg)=>{
        socket.broadcast.emit("rmsg",msg)
    })
    socket.on("video:call",({to,offer})=>{
        console.log(to)
        const toSocketId = UserSocketMap.get(to)
        console.log(toSocketId)
        io.to(toSocketId).emit("incoming:call",{from:socket.id,offer})
    })
})
connectDB()
app.get("/myUsers",async(req,res)=>{
   try {
    const user = await UserSchema.find({})
    if(user){
        res.json(user.map((user)=>user.username))
    }
    else{
        res.json("Not Found")
    }
   } catch (error) {
    console.log(error)
   }
})
app.post("/register",upload.single("profilePhoto"),async(req,res)=>{
    const {fname} = req.body
    const {lname} = req.body
    const {email} = req.body
    const {mobile} = req.body
    const {username} = req.body
    const {password} = req.body
    console.log(req.file)


    try {
        const user = await UserSchema.findOne({email:email})
        if(!user){
            const NewUser = new UserSchema({
                firstName:fname,
                lastName:lname,
                email:email,
                mobileno:mobile,
                username:username,
                password:password,
                profilePhoto:current+"-"+req.file.filename

  
            })
            const cloudinaryResponse = cloudinary.uploader.upload(req.file.path, { folder: "Users",public_id:current+"-"+req.file.filename });

            await NewUser.save()
            res.json("Created")
        }
        else if(user){
            res.json("Exist")
        }
    } catch (error) {
        console.log(error)
    }
})
app.post("/login",async(req,res)=>{
    const {username}=req.body
    const {password}=req.body
    try {
        const user = await UserSchema.find({username:username})
    if(user.length>0){
        const userPassword = user[0].password
        if(userPassword===password){
            res.json("Success")
        }
        else if(userPassword!==password){
            res.json("incorrect password")
        }
    }
    else{
        res.json("Incorrect Username")
    }
    } catch (error) {
        res.send("Invalid")
    }
    
})
app.get("/data/:username",async(req,res)=>{
    const id = req.params
    const username = id.username.replace(":","")
    
    try {
        const userData = await UserSchema.find({username:username})
        if(userData){
            res.send(userData)
        }
        else{
            res.send("Error")
        }
    } catch (error) {
        console.log(error)
    }
})
app.post("/addFriend",async(req,res)=>{
    const {you}=req.body
    const {fname} =  req.body
    const {lname} = req.body
    const {username} = req.body
    const {mobileno} = req.body
    const {dp} = req.body
    try {
           const user = await FriendSchema.findOne({You:you,FriendUsername:username})
           if(user){
            res.send("Already")
           }
           else if(!user){
            const newFriendSchema = new FriendSchema({
                You:you,
                FriendFirstName:fname,
                FriendLastName:lname,
                FriendUsername:username,
                FriendMobileNo:mobileno,
                FriendDp:dp
            })
            newFriendSchema.save()
            res.send("Added")
           }
        
    } catch (error) {
        console.log(error)
    }
})
app.get("/userData",async(req,res)=>{
    const users = await UserSchema.find({})
    if(users){
        res.send(users)
    }
    else{
        res.send("No Record")
    }
})
app.get("/FriendData/:username",async(req,res)=>{
    const id = req.params
    const username = id.username.replace(":","")
    const FriendData=await FriendSchema.find({You:username})
    if(FriendData){
        res.status(200).send(FriendData)
    }
    else{
        res.status(500).send("No Record")
    }
})
app.get("/FriendData/:username/:friend",async(req,res)=>{
    const id = req.params
    const username = id.username.replace(":","")
    const friend = id.friend.replace(":","")
    const FriendData=await FriendSchema.find({You:username ,FriendUsername:friend})
    if(FriendData){
        res.status(200).send(FriendData)
    }
    else{
        res.status(500).send("No Record")
    }
})
app.post("/chat",async(req,res)=>{
    const {from} =req.body
    const {to} = req.body
    const {chatDetails}=req.body

    try {
        const findFrom = await ChatHistory.findOne({from:from,to:to})
        if(!findFrom){
            const History = new ChatHistory({
                from:from,
                to:to,
                chatDetails:[chatDetails],
            })
            await History.save()
            res.status(200).send("Saved")
        }
        else{
            await ChatHistory.updateOne({from:from,to:to},{$push:{chatDetails:chatDetails}},{upsert:true})
            res.status(200).send("Saved")
        }
    } catch (error) {
        console.log(error)
    }
})
app.get("/chatInfo/:from/:to",async(req,res)=>{
    const id = req.params
    const from = id.from.replace(":","")
    const to = id.to.replace(":","")
    const chatInfo = await ChatHistory.find({from:from,to:to})
    if(chatInfo){
        res.send(chatInfo)
    }
})
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
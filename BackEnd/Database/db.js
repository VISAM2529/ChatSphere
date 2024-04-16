
const mongoose = require("mongoose")

const URI = "mongodb+srv://sameer:sameer@cluster0.2cbjy34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = async()=>{
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(() => {
            console.log('Successfully connected to MongoDB Atlas');
          }).catch((error) => {
            console.error('Error connecting to MongoDB Atlas:', error);
          });
        console.log("Successfully Connnect to Database")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connectDB;
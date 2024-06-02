const mongoose = require("mongoose")

const FriendSchema = new mongoose.Schema({
    You:{
        type:String,
        require:true
    },
    FriendFirstName:{
        type:String,
        require:true
    },
    FriendLastName:{
        type:String,
        require:true
    },
    FriendUsername:{
        type:String,
        require:true
    },
    FriendMobileNo:{
        type:Number,
        require:true
    },
    FriendDp:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model("Friends",FriendSchema)
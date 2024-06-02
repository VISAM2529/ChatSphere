const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
    msgtype: {
        type: String
    },
    content: {
        type: String
    },
    date:{
        type:String
    },
    month:{
        type:Number
    },
    year:{
        type:String
    },
    hours:{
      type:String  
    },
    minutes:{
        type:String
    }
    


});

const ChatHistorySchema = new mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    chatDetails: [ChatMessageSchema],
     // Array of ChatMessageSchema objects
});

module.exports = mongoose.model("ChatHistory", ChatHistorySchema);

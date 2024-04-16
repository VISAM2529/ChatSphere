const mongoose = require("mongoose")

const UploadSchema = new mongoose.Schema({
    profilePhoto:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model("Upload",UploadSchema)
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;


const postSchema = mongoose.Schema({
    postTitle: {
        type: String
    },
    description:{
        type:String
    },
    userId : {
        type:ObjectId,
        ref:"User"
    },
    postUrl:{
        type:String

    },
    
}, {
    timestamps: true
})

exports.UserPost = mongoose.model("UserPost", postSchema)
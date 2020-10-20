const mongoose = require("mongoose");
const { array } = require("joi");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
    },
    role:{
        type:String,
        required:true
    }
},{
    timestamps : true
})

exports.User = mongoose.model("User",userSchema);
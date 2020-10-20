const mongoose = require("mongoose");
const { array } = require("joi");
const {ObjectId} = mongoose.Schema.Types;


const consultantSchema = mongoose.Schema({
    skills: {
        type: Array
    },
    userId : {
        type:ObjectId,
        ref:"User"
    },
    imageUrl:{
        type:String

    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    about: {
        type: String
    }
}, {
    timestamps: true
})

exports.Consultant = mongoose.model("Consultant", consultantSchema)
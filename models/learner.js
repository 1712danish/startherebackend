const mongoose = require("mongoose");
const { array } = require("joi");
const {ObjectId} = mongoose.Schema.Types;


const learnerSchema = mongoose.Schema({
    areaOfInterest: {
        type: Array
    },
    imageUrl:{
        type:String
    },
    userId : {
        type:ObjectId,
        ref:"User"
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

exports.Learner = mongoose.model("Learner", learnerSchema)
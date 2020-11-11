const mongoose = require("mongoose");
const { array } = require("joi");

const messageSchema = mongoose.Schema({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

exports.Message = mongoose.model("Message", messageSchema);
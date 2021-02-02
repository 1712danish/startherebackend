const { Message } = require("../models/message");
const Redis = require("ioredis");
const { User } = require("../models/users")
const mongoose = require("mongoose");
const redisClient = new Redis({
    port: 6379, // Redis port
    host: "localhost", // Redis host
})

exports.chat = async (req, res) => {
    const io = require("../io");
    const { to, from, message, recievername } = req.body
    console.log(req.body)

    try {
        const newMssg = {
            to,
            recievername,
            from,
            message
        }
        // console.log("user",from)

        const user = await User.find({ _id: mongoose.Types.ObjectId(from) },{ name : 1});

        // console.log("user",user)


        io.to(to).emit("messageRecieved", {
            name: user[0].name,
            message
        })

        await new Message(newMssg).save();
        return res.status(200).json({
        })

    } catch (error) {
        console.error("Error Occcured", error)
        return res.status(500).json({
            error: "Something went Wrong!!!"
        })
    }

}


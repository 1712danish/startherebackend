const { Message } = require("../models/message")

exports.chat = async (req, res) => {
    const {to,from,message} = req.body

    try {
    //    console.log("MESSAGE: ======",req.body);
       const newMssg = {
           to,
           from,
           message
       }
       await new Message(newMssg).save()

    } catch (error) {
        console.error("Error Occcured", error)
        return res.status(500).json({
            error: "Something went Wrong!!!"
        })
    }

}


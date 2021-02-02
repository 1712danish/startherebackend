const { Message } = require("../models/message")
const { User } = require("../models/users")
const mongoose = require("mongoose");


exports.getMssgList = async (req, res) => {

    const { id } = req.query
    // const list = []
    try {
        const userList = await Message.find({ from: id }, {}, { lean: true }).distinct('to');
        const list = await User.find({ _id: { $in: userList } }, { name: 1 })

        return res.send(list)
    } catch (err) {
        console.log(err)
    }

}

exports.getMssgs = async (req, res) => {
    const { id, to } = req.query
    result=[]
    try {
        const messages = await Message.find({ from: { $in: [id, to] }, to: { $in: [id, to] } })
        const name = await User.find({_id:{$in:[id,to]}},{name:1})
        await messages.forEach(element=>{
            name.forEach(n=>{
                if(n._id === element.to){
                    result.push({
                        element,
                        name:n.name
                    })
                }
                
            })
        })
        // result={
        //     mssg:messages,
        //     name
        // }
        console.log(result)

        res.send(messages)

    } catch (err) {
        console.error(err)
    }
}
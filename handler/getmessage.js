const {Message} = require("../models/message")
const {User} = require("../models/users")
const mongoose = require("mongoose");


exports.getMssgList = async(req,res)=>{

    const {id} = req.query
    // const list = []
    try{
        const userList = await Message.find({from:id},{},{lean:true}).distinct('to');
        // console.log("???????????????????????",userList[0])
        const list  =  await User.find({_id:{$in:userList}},{name:1})
        
        // userList.map((user)=>{
        //      const name = User.find({_id:user},{ name : 1})
        //      list.push(name)
        //      console.log(">>>>>>>>>>>>>>>>>>>.",list)


        // })
        // console.log(">>>>>>>>>>>>>>>>>>>.",list)

        return res.send(list)
    }catch(err){
        console.log(err)
    }

}

exports.getMssgs =  async(req,res)=>{
    const {id,to} =  req.query
    // const messages=[]
    try{
        const messages = await Message.find({from : {$in:[id,to]},to : {$in:[id,to]}})
        // const names = await User.find({_id:{$in:[id,to]}},{name:1})
       
        res.send(messages)

    }catch(err){
        console.error(err)
    }
}

const { Learner } = require("../models/learner")
const { Consultant } = require("../models/consultant")
const { validateAuth } = require("../middlewares/auth")
const { request } = require("express")
const { User } = require("../models/users")




exports.Profile = async (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    // console.log(req.body)


    if (req.user.role == "Learner") {
        try {
            await Learner.findOneAndUpdate({ userId: req.user._id },
                {
                    $set: req.body
                })

            return res.status(200).json({
                message: "profile updated!!"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: "Something went Wrong!!!"
            })

        }

    } else {
        try {
            await Consultant.updateOne({ userId: req.user._id },
                {
                    $set: req.body
                })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: "Something went Wrong!!!"
            })

        }

    }
}

exports.showProfile = async (req, res) => {
    const {id } = req.query;
    
    try{
       const user =  await User.find({ _id: id || req.user._id }).populate("_id","role")
       if(!user){
           //send error user not found
           return res.status(400).json({
               message : "Invalid User Id"
           })
       }
    //    console.log("0000000",user[0].role)
       if(user[0].role == "Learner"){
           const learner = await Learner.find({userId: id || req.user._id }).populate("userId", "role name email imageUrl")
        //    console.log("*******************>",learner)
           return res.json(learner)
       }else{
        const consultant = await Consultant.find({userId: id || req.user._id }).populate("userId", "role name email imageUrl")
        return res.json(consultant)

       }


    }catch(err){

    }

    // await User.find({ userId: id || req.user._id })
    // .then(user => {
    //     res.json(post)
    // }).catch((err) => {
    //     console.log(err);
    // });

    // if (req.user.role == "Learner" || role ==="Learner") {
    //     await Learner.find({ userId: req.user._id }).populate("userId", "role name email imageUrl")
    //         .then(post => {
    //             res.json(post)
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }else{
    //     await Consultant.find({ userId: id || req.user._id }).populate("userId", "role name email imageUrl")
    //         .then(post => {
    //             res.json(post)
    //         }).catch((err) => {
    //             console.log(err);
    //         });

    // }

}
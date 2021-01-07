const { transporter } = require("../routes/mailer");
const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { JWT_SECRET } = require("../keys");

exports.resetPassword = async (req,res)=>{

    const {email} =req.body;
    console.log("-------------",email)
    if(!email){
        return res.json({error:"please enter email."})
    }
    crypto.randomBytes(32,async(err,Buffer)=>{
        if(err){
            console.log(err);
        }
        const token=Buffer.toString("hex")
        User.findOne({email:email})
        .then(async(user)=>{
            if(!user){
                return res.json({error:"User does'nt exists."})
            }
            user.resetToken=token;
            user.expireToken= Date.now()+3600000;
            await user.save();
            const mailOptions = {
                from: 'workera@gmail.com',//replace with your email
                to: user.email,//replace with your email
                subject: 'Password reset.',
                html: "Hi,"+user.name+'<br> you have requested for password reset<br>click on <a href="http://localhost:3000/admin/new-pass/'+token+'">link</a> to reset password.'
            };
            console.log("http://localhost:3000/admin/new-pass/"+token)
            try {
                await transporter.sendMail(mailOptions)
                console.log("Email sent Successfully!")
            } catch (err) {
                console.log("error occured while sending email!", err)
            }
            return res.status(200).json({
                message: "we have sent password rest link to your mail."
            });
        })
    })

}

exports.newPassword = async (req,res)=>{
    const {password,token} = req.body;
    User.findOne({expireToken:token,expireToken:{$gt:Date.now()}})
    .then(async (user)=>{
        if(!user){
            return res.json({errro:"Session expired try again."})
        }
        const hashedPassword = bcrypt.hashSync(password,12);
        user.password=hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        await user.save();
        return res.status(200).json({
            message: "Password updated successfully."
        });


    }).catch(err=>{
        console.log(err);
    })
}
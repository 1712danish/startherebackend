const { User } = require("../models/users")
const {Learner} = require("../models/learner")
const {Consultant} = require("../models/consultant")
const bcrypt = require("bcryptjs")
const e = require("express")

exports.signup = async (req, res) => {
    const { name, email, phone, password, areaOfInterest, role, skills } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Please fil all the feilds.",
        });
    }

    try {
        const savedUser = await User.findOne({ email: email });
        if (savedUser) return res.status(409).json({
            error: "User already saved",
        });

        const hashedPassword = bcrypt.hashSync(password, 12);
        const user = {
            name,
            email,
            phone,
            role,
            password: hashedPassword
        }
        const result = await new User(user).save();
        console.log(result)
        if (role === "Learner") {
            const learner =  new Learner({
                userId: result._id,
                areaOfInterest
            })
            await learner.save()
        }else{
            const consultant = new Consultant ({
                userId: result._id,
                skills
            })
            
            await consultant.save()
        }


        return res.status(200).json({
            message: "user saved successfully."
        });


    } catch (error) {
        console.error("Error Occcured", error)
        return res.status(500).json({
            error: "Something went Wrong!!!"
        })
    }

}


const { Learner } = require("../models/learner")
const { Consultant } = require("../models/consultant")


exports.consultantList = async (req, res) => {
    // console.log(req.user)

    if (req.user.role == "Learner") {
        try {
            const result = await Learner.find({ userId: req.user._id }).populate("userId", "role areaOfInterest name email imageUrl")

            // console.log(result[0].areaOfInterest)
            
                const consultant = await Consultant.find({ skills  : { "$in": result[0].areaOfInterest}}).te("userId", "skills name email imageUrl")
                // console.log(consultant)
                res.json(consultant)



        } catch (err) {
            console.log(err);
        };

    }else{
        try{
        const result = await Consultant.find({ userId: req.user._id }).populate("userId", "role skills name email imageUrl")

            // console.log(result[0].areaOfInterest)
            
                const learner = await Learner.find({ areaOfInterest  : { "$in": result[0].skills}}).populate("userId", "areaOfInterest name email imageUrl")
                // console.log(learner)
                res.json(learner)



        } catch (err) {
            console.log(err);
        };

    }
}
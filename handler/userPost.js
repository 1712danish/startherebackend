const { UserPost } = require("../models/userPost")

exports.userPost = async (req, res) => {
    const { postTitle, postUrl ,description} = req.body
    if (!postTitle || !postUrl) {
        return res.status(400).json({
            error: "Please fil all the feilds.",
        })
    }
    try {
        const post = {
            postTitle,
            postUrl,
            description,
            userId: req.user

        }

        // console.log("------------>",post)
        await new UserPost(post).save()

        return res.status(200).json({
            message: "user saved successfully."
        });
        

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Something went Wrong!!!"
        })
    }



}

exports.getPost= async (req,res)=>{
    const {id } = req.query;
    try{
        const Post = await UserPost.find({userId:id || req.user._id})

        if(!Post){
            return res.status(400).json({
                message : "No posts yet."
            })

        }else{
            console.log(Post)
            return res.json(Post)
        }


    }catch(err){
        console.error(err)

    }
}
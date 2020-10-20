
const { JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken")
const { User } = require("../models/users")

exports.validateAuth = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Missing Authorization" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = await jwt.verify(token, JWT_SECRET)

        const result = await User.findById(decoded._id);
        if (result) {
            req.user = result;
            return next()
        }

        return res.status(401).json({ error: "Invalid Token" });


    } catch (err) {
        console.error(typeof err, err.name);
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Invalid Token" });
        }
        return res.status(500).json({ error: "Something went wrong!" })
    }
};



const Joi = require("joi");
exports.registerUser = {
    body : Joi.object().keys({
        name:Joi.string().required(),
        email : Joi.string().email().required(),
        password:Joi.string().min(6),
        phone:Joi.number().min(10),
        role:Joi.string(),
        areaOfInterest: Joi.array(),
        skills:Joi.array()
    })
}

exports.signinUser = {
    body : Joi.object().keys({
        
        email : Joi.string().email().required(),
        password:Joi.string().min(6),
        
    })
}

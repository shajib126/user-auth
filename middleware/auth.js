const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.authentication = async(req,res,next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            res.status(402).json({
                success:false,
                message:'Not authorized user'
            })
        }else{
            const user = await jwt.verify(token,process.env.JWT_SECRET)
            const email = user.user
            req.user = email;
            next()
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
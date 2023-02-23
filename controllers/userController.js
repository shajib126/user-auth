const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

exports.registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const existUser = await User.findOne({email})
        if(existUser){
            res.status(400).json({
                success:false,
                message:'user already registered by this email'
            })
        }
        else if(!name || !email || !password){
            res.status(400).json({
                success:false,
                message:'All field Are required!'
            })
        }else{
            const hashedPass = await bcrypt.hash(password,10)
            const user = new User({name,email,password:hashedPass})
            await user.save()
            res.status(200).json({
                success:true,
                user
            })
        }
     } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const {email,password,confirmPassword} = req.body
        if(password !== confirmPassword){
            res.status(406).json({
                success:false,
                message:"Password Does not match!"
            })
        }
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:'All field required!'
            })
        }
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                res.status(406).json({
                    success:false,
                    message:"Incorrect Password"
                })
            }else{
                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), user:user.email}
                const token = await jwt.sign(Payload,process.env.JWT_SECRET)
                res.status(200).json({
                    success:true,
                    token,
                    user
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.userProfile = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.user}).select("-password")
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
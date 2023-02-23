const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Your name"],

    },
    email:{
        type:String,
        required:[true,"Please enter Your email"],

    },
    password:{
        type:String,
        required:[true,'please enter password'],
        min:[6,'Password should be equal or more than 6 digit']
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User
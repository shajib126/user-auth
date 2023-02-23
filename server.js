const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
const userRoute =require('./routes/userRoute')
const mongoose = require('mongoose')

dotenv.config()
//middleware
app.use(express.json())
app.use(cors())

//route middleware
app.use('/user',userRoute)


mongoose.connect(process.env.MONGO_URI).then(()=>console.log(`MONGO DB Connected ${mongoose.connection.host}`)).catch((err)=>console.log(err)).finally(()=>{
    const port = process.env.PORT
    app.listen(port,()=>console.log(`server running in ${port}`))
})


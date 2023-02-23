
const router = require('express').Router()
const { registerUser, login, userProfile } = require('../controllers/userController')
const { authentication } = require('../middleware/auth')


    router.post('/register',registerUser)
    router.post('/login',login)
    router.get('/me',authentication,userProfile)
module.exports = router
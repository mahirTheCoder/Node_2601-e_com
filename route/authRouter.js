const express = require('express')
const { signup, verifyOTP, resendOTP, signin } = require('../controllers/authController')
const route = express.Router()


route.post('/signup', signup)
route.post('/verifyOtp', verifyOTP)
route.post('/resendOtp', resendOTP)
route.post('/signin', signin)

module.exports = route
const express = require('express')
const { signup, verifyOTP, resendOTP, signin, profile } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const route = express.Router()


route.post('/signup', signup)
route.post('/verifyOtp', verifyOTP)
route.post('/resendOtp', resendOTP)
route.post('/signin', signin)
route.get('/profile', authMiddleware, profile)

module.exports = route
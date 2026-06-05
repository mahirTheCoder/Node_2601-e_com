const express = require('express')
const multer = require('multer')
const upload = multer()
const { signup, verifyOTP, resendOTP, signin, updateProfile, getProfile } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')

const route = express.Router()


route.post('/signup', signup)
route.post('/verifyOtp', verifyOTP)
route.post('/resendOtp', resendOTP)
route.post('/signin', signin)
route.get('/getProfile', authMiddleware, getProfile)
route.put('/updateProfile', authMiddleware, upload.single('avatar'), updateProfile)

module.exports = route
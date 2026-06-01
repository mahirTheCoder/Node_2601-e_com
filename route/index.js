 const express = require('express')
 const route = express.Router()
 const authRouter = require('./authRouter')


 
 route.get('/', (req, res) => {
   res.status(200).send('Hello World!')
 })

 route.use('/auth', authRouter)
 
 module.exports = route
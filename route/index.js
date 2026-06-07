 const express = require('express')
 const route = express.Router()
 const authRouter = require('./authRouter')
const catRote = require('./categoryRoute') 

 
 route.get('/', (req, res) => {
   res.status(200).send('Hello World!')
 })

 route.use('/auth', authRouter)
 route.use("/category", catRote );

 
 module.exports = route
const express = require('express')
const router = require('./route');
const dbConfig = require('./configs/dbConfig');
const cookieParser = require('cookie-parser');
const cloudinaryConfig = require('./configs/cloudinaryConfig');

const app = express()
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(router);
dbConfig()
cloudinaryConfig()

// -----when db congfig not working then use this code t
// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4'])

// -----env
// MONGODB_URL = mongodb+srv://node_Ecom:AWufiBcjuNvMr8Vj@cluster0.mjewgzf.mongodb.net/Node_Ecom?appName=Cluster0
// JWT_SEC = kdfjdfhnjdhfkjdfh


app.listen((8000), () => {
  console.log(`Server is running on port ${8000}`)
})

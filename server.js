const express = require('express')
const router = require('./route');
const dbConfig = require('./configs/dbConfig');
const app = express()
require('dotenv').config();
app.use(express.json());
app.use(router);
dbConfig()

// -----when db congfig not working then use this code t
// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4'])

app.listen((8000), () => {
  console.log(`Server is running on port ${8000}`)
})

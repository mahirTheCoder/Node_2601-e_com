const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb Connected successfully!"));
};

// MONGODB_URL = mongodb+srv://node_Ecom:AWufiBcjuNvMr8Vj@cluster0.mjewgzf.mongodb.net/Node_Ecom?appName=Cluster0


module.exports = dbConfig
const cloudinary = require("cloudinary").v2;


  cloudinary.config({
    cloud_name: "db21zycb0",
    api_key: "298821355698613",
    api_secret: "owgaBIgfXbjJLsxjIp0br3PHxCk",
  });


module.exports = cloudinary;
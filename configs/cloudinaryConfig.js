const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "db21zycb0",
    api_key: "642813358935835",
    api_secret: "6v5uPwT3-12eh1mhqRAVFloGbpY",
  });
};

module.exports = cloudinaryConfig;
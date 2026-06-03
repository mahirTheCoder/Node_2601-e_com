const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cloudinary = require("../configs/cloudinaryConfig");



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 

const generateOTP = () => {
  // --------- Generate a random 4-digit OTP
  return crypto.randomInt(1000, 10000).toString();
};



//  Access Token Generate

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      roll: user.roll,
    },
    process.env.JWT_SEC,
    { expiresIn: "2h" }
  );
};

// ---------refresh token generate
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SEC,
    { expiresIn: "7d" }
  );
};


// -----------upload to cloudinery 

const uploadToCloudinary = async ({ mimetype, imgBuffer }) => {
  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;

  return await cloudinary.uploader.upload(dataUrl);
};


// -----------destroy from cloudinery
// const destroyFromCloudinary = (url) => {
//   const publicId = url.split("/").pop().split(".").shift();

//   cloudinary.uploader.destroy(publicId, (error, result) => {
//     if (error) {
//       console.log("Destroy From Cloudinary:", error);
//     }
//   });
// };



module.exports = { isValidEmail, generateOTP, generateAccessToken, generateRefreshToken, uploadToCloudinary }
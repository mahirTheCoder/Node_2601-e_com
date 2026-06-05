const { otpEmailTemplates } = require("../helpers/emailTemplates");
const mailSender = require("../helpers/mailService");
const {
  isValidEmail,
  generateOTP,
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../helpers/utils");
const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/utils");
// ---------Signup controller
const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname) return res.status(400).send("Fullname is required");
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    if (!password)
      return res
        .status(400)
        .send("Password is required and must be at least 6 characters long");

    // ---------exesting email check
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // ---------otp generate
    const otp = generateOTP();

    // ---------save user data in database
    const user = await userSchema.create({
      fullname,
      email,
      password,
      otp,
      otpExpires: Date.now() + 2 * 60 * 1000, // OTP expires in 2 minutes
    });

    // ---------send otp to user email
    await mailSender({
      email,
      subject: "OTP Verification",
      otp,
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }

  res.status(200).send("Signup successful!");
};

// -------OTP verify controller
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userSchema.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
      isVerified: false,
    });

    if (!user) {
      return res.status(400).send("Invalid OTP or User not found");
    }

    user.isVerified = true;

    user.otp = null;

    user.otpExpires = null;

    await user.save();

    // res.redirect("clienturl/login");

    res.status(200).send("OTP verified successfully!");
  } catch (err) {
    console.log(err);

    return res.status(500).send("Server error");
  }
};

// -------Resend OTP controller
const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userSchema.findOne({ email, isVerified: false });
    console.log(user);
    if (!user) {
      return res.status(400).send("invalid request");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 2 * 60 * 1000;
    await user.save();

    await mailSender({
      email,
      subject: "Resend OTP",
      otp,
    });

    res.status(200).send("OTP resent successfully!");
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

// // --------cookies config
const cookieConfig = {
  httpOnly: true,
  secure: false,
  // sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// --------------sign in controller
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = generateAccessToken(user);
    const reftoken = generateRefreshToken(user);

    res
      .status(200)
      .cookie("acc_tkn", token, cookieConfig)
      .cookie("ref_tkn", reftoken, cookieConfig)
      .send({ message: "Signin successful!" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};

// -----------profile controller
const getProfile = async (req, res) => {
  try {
    const profileData = await userSchema.findOne(
      { _id: req.user._id },
      { fullname: 1, email: 1, roll: 1, avatar: 1, address: 1 },
    );
    if (!profileData)
      return res.status(400).send({ message: "Invalid request" });

    res.status(200).send(profileData);
  } catch (error) {
    console.log("PROFILE ERROR:", error);

    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

// ----------update profile controller

const updateProfile = async (req, res) => {
  const { fullname, address } = req.body;
  const avatar = req.file;
  try {
    const userData = await userSchema.findOne({ _id: req.user._id });
    console.log(userData);
    if (!userData) return res.status(400).send({ message: "Invalid request" });
    if (fullname && fullname.trim()) userData.fullname = fullname;
    if (address) userData.address = address;
    if (avatar) {
      console.log(avatar);
      const avatarUrl = await uploadToCloudinary({
        mimetype: avatar.mimetype,
        imgBuffer: avatar.buffer,
      });
      // if (userData.avatar) {
      //   destroyFromCloudinary(userData.avatar);
      // }
      userData.avatar = avatarUrl;
    }
    await userData.save();
    res.status(200).send({ message: "Profile updated successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  verifyOTP,
  resendOTP,
  signin,
  getProfile,
  updateProfile,
};

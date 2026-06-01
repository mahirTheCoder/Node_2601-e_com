const nodemailer = require("nodemailer");
const { otpTemplate } = require("./emailTemplates");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "mahirthecoder.bd@gmail.com",
    pass: "acgg rmko tyze jshm",
    // pass: "acgg rmko tyze jshm",
  },
});

const mailSender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: `"node_Ecom team" <mahirthecoder.bd@gmail.com>`,
      to: email,
      subject,
      html: otpTemplate(otp),
    });

    console.log("Mail Sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailSender;

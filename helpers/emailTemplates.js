const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
  theme: "default",

  product: {
    name: "WebNexora",
    link: "https://webnexora.com",
  },
});

const otpTemplate = (otp) => {
  const response = {
    body: {
      name: "User",

      intro: "Your OTP verification code",

      table: {
        data: [
          {
            OTP: otp,
            Expires: "2 Minutes",
          },
        ],
      },

      outro: "If you didn’t request this, ignore this email.",
    },
  };

  return mailGenerator.generate(response);
};

module.exports = { otpTemplate };
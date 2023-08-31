import connectDb from "@/utils/connectDb";
import user from "@/model/user";
import { createRouter } from "next-connect";
import forgot from "@/model/forgot";
const nodemailer = require("nodemailer");

connectDb();

const router = createRouter();

router.post(async (req, res) => {
  try {
    //Destructuring email form request
    const { email } = req.body;
    //Finding user in db
    const User = await user.findOne({ email: email });
    //If user doesnot exists
    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "User doesnot exist" });
    }
    //  if user exist

    //Calculating time in milliseconds for token expiration
    const time = new Date();
    const timeMS = time.getTime();

    //token generating function
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const token = getRndInteger(100000, 999999).toString();

    //Email message to be sent
    const emailMessage = `<html>
<head>
</head>
<body>
  <p><strong>Subject:</strong> Password Reset OTP for Your <strong>PrimeFind.com</strong> Account</p>
  <p>Hello <strong>${User.name}</strong>,</p>
  <p>We've received a request to reset the password for your account at <strong>PrimeFind.com</strong>.</p>
  <p>To verify your identity and ensure the security of your account, please use the following One-Time Password (OTP):</p>
  <p>Your OTP: <strong>${token}</strong></p>
  <p>Your token is valid for only 10 minutes</p>
  <p><a href="https://PrimeFind.com/forgot?token=${token}&email=${email}"><strong>Click this url to reset password</strong></a></p>
  <p><br><strong>Best regards,</strong><br>The PrimeFind Team</p>
</body>
</html>`;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", //using service gmail
      auth: {
        user: "anassohail34343@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Define the email content
    const mailOptions = {
      from: "anassohail34343@gmail.com",
      to: email,
      subject: "Forgot password",
      html: emailMessage,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        return res.status(501).json({ success: false, message: error });
      }
    });

    //Creating a new forgot user
    const forgotUser = new forgot({
      email: email,
      token: token,
      time: timeMS,
    });

    await forgotUser.save();

    res
      .status(200)
      .json({ success: true, message: "Email has been sent to you" });
  } catch (error) {
    //if any internal server error occured
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error occured" });
  }
});

export default router.handler();

import connectDb from "@/utils/connectDb";
import user from "@/model/user";
import { createRouter } from "next-connect";
import forgot from "@/model/forgot";
var CryptoJS = require("crypto-js");

connectDb();

const router = createRouter();

router.post(async (req, res) => {
  try {
    //Destructuing post information
    const { newPassword, token, email } = req.body;
    console.log(email,token);
    const forgotUser = await forgot.findOne({ email, token });

    console.log(forgotUser);

    //If user doensot exist in database with this email and token
    if (!forgotUser) {
      return res
        .status(200)
        .json({ success: false, message: "Otp doesnot exist with this email" });
    }

    //Checking otp expiration
    const time = new Date().getTime();
    if ((time-forgotUser.time) > 600000) {
      return res
        .status(400)
        .json({ success: false, message: "Otp has been expired" });
    }

    //Updating user's password
    const User = await user.findOneAndUpdate(
      { email: email },
      {
        password: CryptoJS.AES.encrypt(
          newPassword,
          process.env.AES_SECRET
        ).toString(),
      }
    );
    return res.status(200).json({
      success: true,
      message: "Password has been successfully changed.",
    });
  } 
  
  catch (error) {
    //If any error occured
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error occured" });
  }
});

export default router.handler();

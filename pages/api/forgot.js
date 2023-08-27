import connectDb from "@/utils/connectDb";
import user from "@/model/user";
import { createRouter } from "next-connect";
import forgot from "@/model/forgot";

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
        .statusCode(404)
        .json({ success: false, message: "User doesnot exist" });
    }
    //  //if user exist

    //token generating function
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

    const token = getRndInteger(100000,999999).toString()
    const emailMessage = `Subject: Password Reset OTP for Your <b> PrimeFind.com </b>  Account

    Hello ${User.name},
    
    We've received a request to reset the password for your account at <b> PrimeFind.com </b> . To verify your identity and ensure the security of your account, please use the following One-Time Password (OTP):
    
    Your OTP: [Insert OTP Code]
     
    <a href= 'https://PrimeFind.com/forgot?token=${token}'>Click here to reset your password </a>

    </br>

   <b> Best regards,
    The PrimeFind Team </b>`

    const forgotUser =  new forgot({
        email:email,
        token:token
    })
    
    await forgotUser.save()
    
    res.statusCode(200).json({ success: true, message: "Email has been sent to you" });
  } catch (error) {
    //if any internal server error occured
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error occured" });
  }
});

export default router.handler();

import connectDb from "@/utils/connectDb";
import user from "@/model/user";
import { createRouter } from "next-connect";
import jwt_decode from "jwt-decode";



// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {
  try {
    //Extracting token from body
    const { token } = req.body;
    const decodedToken =  jwt_decode(token);
    // console.log(decodedToken);
    //decoding token and sending email value to find user
    const User = await user.findOne({ email: decodedToken.email });
    //If user not found
    if (!User) {
      return res
        .statusCode(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, name:User.name , email:User.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success:false , message:"Internal server error occured" });
  }
});

export default router.handler();

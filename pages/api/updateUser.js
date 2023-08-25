import connectDb from "@/utils/connectDb";
import user from "@/model/user";
import { createRouter } from "next-connect";
var CryptoJS = require("crypto-js");

// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {
  try {
    //Extracting user data
    const { name, password, email } = req.body;
    if (password.length === 0) {
      //Finding user and updating his credentials
      let User = await user.findOneAndUpdate(
        { email: email },
        {
          name: name,
        }
      );
      return res
        .status(200)
        .json({
          success: true,
          message: "Username updated successfully",
          credentials: false,
        });
    }
    //Finding user and updating his credentials
    let User = await user.findOneAndUpdate(
      { email: email },
      {
        password: CryptoJS.AES.encrypt(
          password,
          process.env.AES_SECRET
        ).toString(),
        name: name,
      }
    );
    // console.log(User);
    //incase user didnot found or any error acured in updating
    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update credentials" });
    }
    //If no error occured
    res
      .status(200)
      .json({
        success: true,
        message: "Credentials updated successfully",
        credentials: true,
      });
  } catch (error) {
    //If server error occured
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "An error occured while updating" });
  }
});

export default router.handler();

import { createRouter } from "next-connect";
import connectDb from "@/utils/connectDb";
import order from "@/model/order";
var jwt = require("jsonwebtoken");

// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {
  try {

    const token = req.body.token;
    // console.log(token);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    const Order = await order.find({ email: data.email });
    res.status(200).json({ Orders: Order });

  } 
  catch (error) {
    console.log("Error in fetching Order in myorders Api:  " + error);
    res.status(500).json({ Error: "Internal Error" });
  }
});

export default router.handler();

import { createRouter } from "next-connect";
import connectDb from "@/utils/connectDb";
import order from "@/model/order";

// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {

  try {
    const Order =  new order({
      email: req.body.email,
      orderId: req.body.orderId,
      products: [req.body.products],
      address: req.body.address,
      amount: req.body.amount,
      status: req.body.status,
    });
    await Order.save()

    res.status(200).json({success:"OrderInitiated"})


  } catch (error) {
    console.log("Error Occured in initiating in Order " + error);
  }
});

export default router.handler()

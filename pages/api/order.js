import { createRouter } from "next-connect";
import connectDb from "@/utils/connectDb";
import order from "@/model/order";
import product from "@/model/product";
import pincodes from "../../pincode.json";

// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {
  //initiating new order
  try {
    //Checking that the pincode is serviceable
    if (!Object.keys(pincodes).includes(req.body.zipcode)) {
      return res
        .status(200)
        .json({
          success: false,
          message: "Sorry! This pincode is not serviceable",
        });
    }

    //Checking that cart is not empty
    if (req.body.amount <= 0) {
      return res
        .status(200)
        .json({ success: false, message: "Cannot proceed with empty cart" });
    }
    //Checking if item is out of stock
    const {products} = req.body.products;
    console.log(products);

    for (let item in products) {
      // console.log(item);
      const Product = await product.findOne({ slug: item });
     
      console.log(Product);
      if (Product.availableQty < products[item].qty) {
        return res.status(200).json({
          success: false,
          message: "Sorry Some items went out of stock",
        });
      }
    }

    const Order = new order({
      email: req.body.email,
      orderId: req.body.orderId,
      products: req.body.products,
      address: req.body.address,
      amount: req.body.amount,
      status: req.body.status,
      zipcode: req.body.zipcode,
    });

    // console.log(req.body.products);

    //saving order in database
    await Order.save();

    for (let item in products) {
      await product.findOneAndUpdate(
        { slug: item },
        { $inc: { availableQty: -products[item].qty } }
      );
    }

    res.status(200).json({ success: true });

    //Error handling
  } catch (error) {
    console.log("Error Occured in initiating in Order " + error);
  }
});

export default router.handler();

import { createRouter } from "next-connect";
import connectDb from "@/utils/connectDb";
import order from "@/model/order";
import product from "@/model/product";

// Database connection
connectDb();

const router = createRouter();

router.post(async (req, res) => {
  //initiating new order
  try {
    //Checking if item is out of stock
    const products = req.body.products;
    // console.log(products);

    for (let item in products) {
      // console.log(item);
      const Product = await product.findOne({ slug: item });
      // console.log(Product , products[item]);
      // console.log(Product.availableQty,products[item].qty);
      if (Product.availableQty < products[item].qty) {
        return res
          .status(200)
          .json({
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
    });

    // console.log(req.body.products);

    //saving order in database
    await Order.save();

    for (let item in products) {
       await product.findOneAndUpdate({ slug: item } , {$inc :{"availableQty": -products[item].qty}});
    }

    res.status(200).json({ success: true });

    //Error handling
  } catch (error) {
    console.log("Error Occured in initiating in Order " + error);
  }
});

export default router.handler();

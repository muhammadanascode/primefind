import { createRouter } from 'next-connect'
import connectDb from "@/utils/connectDb"
import product from "@/model/product"

// Database connection
connectDb()

const router = createRouter();

// GET Request to fetch all products
router.get(async (req, res) => {

  const category  = req.query.category
  // console.log(req.query);

  try {
    const products = await product.find({ category: category });   
    // console.log("Product log :" + products);      
    if(!products){
      res.status(200).json({success:false,message:"No products avaibale "});
    }                    
    res.status(200).json({success:true,products});

  } catch (error) {
    console.log("Error in finding products: " + error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});



// POST Request to create a new product
router.post(async (req, res) => {
  try {
    const { title, slug, description, img, category,  color, price, availableQty } = req.body;
    const newProduct = new product({ title, slug, description, img, category, color, price, availableQty });
    await newProduct.save();
    res.status(200).json({ success: "Product created." });
  } catch (error) {
    console.log("Error in creating product: " + error);
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
});

// PATCH Request to update a product
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await product.findByIdAndUpdate({ _id: productId }, req.body);
    res.status(200).json({ success: "Product updated." });
  } catch (error) {
    console.log("Error occurred while updating product: " + error);
    res.status(500).json({ error: "An error occurred while updating the product." });
  }
});

export default router.handler();

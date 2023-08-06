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
    const tshirts = {};

    for (let item of products) {
      if (item.title in tshirts) {
        if (!tshirts[item.title].color.includes(item.color) && item.availabeQty > 0) {
          tshirts[item.title].color.push(item.color);
        }
        if (!tshirts[item.title].size.includes(item.size) && item.availabeQty > 0) {
          tshirts[item.title].size.push(item.size);
        }
      } else {
        tshirts[item.title] = item;
        if (item.availabeQty > 0) {
          tshirts[item.title].color = [item.color];
          tshirts[item.title].size = [item.size]
        }
      }
    }

    // console.log(tshirts);
    
    res.status(200).json(tshirts);
  } catch (error) {
    console.log("Error in finding products: " + error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});



// POST Request to create a new product
router.post(async (req, res) => {
  try {
    const { title, slug, description, img, category, size, color, price, availabeQty } = req.body;
    const newProduct = new product({ title, slug, description, img, category, size, color, price, availabeQty });
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

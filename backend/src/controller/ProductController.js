const products = require("../model/Product");
const uploadoncloudinary = require("../Utils/Cloudinary.jsx");

const addproduct = async (req, res) => {
  try {
    console.log("📸 Uploaded Files:", req.files);

    let { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    // সব images Cloudinary তে upload
    const image1 = req.files.image1 ? await uploadoncloudinary(req.files.image1[0].path) : null;
    const image2 = req.files.image2 ? await uploadoncloudinary(req.files.image2[0].path) : null;
    const image3 = req.files.image3 ? await uploadoncloudinary(req.files.image3[0].path) : null;
    const image4 = req.files.image4 ? await uploadoncloudinary(req.files.image4[0].path) : null;
  

     
                                                              
    const productdata = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
   
    };

    const product = await products.create(productdata);
    return res.status(201).json(product);

  } catch (error) {
    console.error("🔥 addproduct error details:", error);
    return res.status(400).json({ message: `addproduct error: ${error.message}` });
  }
};

const listproduct = async (req, res) => {
  try {
    const Product = await products.find({});
    return res.status(200).json(Product); // 201 না, 200 বেশি ঠিক
  } catch (error) {
    console.error("🔥 listproduct error details:", error);
    return res.status(400).json({ message: `listproduct error: ${error.message}` });
  }
};

const removeproduct = async (req, res) => {
  try {
    let { id } = req.params;
    const findproduct = await products.findByIdAndDelete(id);
    return res.status(200).json(findproduct);
  } catch (error) {
    console.error("🔥 removeproduct error details:", error);
    return res.status(400).json({ message: `removeproduct error: ${error.message}` });
  }
};

// ✅ একসাথে export করা
module.exports = {
  addproduct,
  listproduct,
  removeproduct
};


const Product=require('../models/Productmodel')

const createproduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();

    console.log("Product saved:", newProduct); 

    res.status(201).json({ 
      message: 'Product created successfully', 
      product: newProduct 
    });
  } catch (error) {
    console.error('Create Product Error:', error); 
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

//getallproducts
const getallproducts=async(req,res)=>{
   try {
    const products=await Product.find()
    res.status(200).json({message:'products fetched successfully' , products})
   } catch (error) {
    res.status(500).json({message:'error fetching products',error}) 
   }
}

module.exports={getallproducts,createproduct}

const Product=require('../models/Productmodel')

const createproduct = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({ name, description, image });
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

const getproductbyid=async(req,res)=>{
  try {
    const {id}=req.params
    const product =await Product.findById(id)
    if(!product) return res.status(404).json({message:'product not found'})
      res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:'failed to fetch products',error:error.message})
  }
}



//update products

const updateproduct= async(req,res)=>{
try {
  const updated= await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
  })
  
  if(!updated) return res.status(404 ).json({message:'product not found'})
    res.status(200).json({message:'product updated successfully',updated})
} catch (error) {
  res.status(500).json({message:'Error updating product',error})
}
}

const deleteproduct=async(req,res)=>{
  try {
    const deleted=await Product.findByIdAndDelete(req.params.id)
    if(!deleted) return res.status(404).json({message:'product not found'})
      res.status(200).json({message:'product deleted successfully',deleted})
  } catch (error) {
    res.status(500).json({message:'error deleting product',error})
  }
}
module.exports={getallproducts,createproduct,updateproduct,deleteproduct,getproductbyid}
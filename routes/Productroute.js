const express=require('express')
const{getallproducts,createproduct,updateproduct,deleteproduct,getproductbyid}=require('../controllers/Productcontroller')
const routers=express.Router()
routers.post('/createproducts',createproduct)
routers.get('/getproducts',getallproducts)
routers.get('/getproduct/:id',getproductbyid)
routers.put('/updateproduct/:id',updateproduct)
routers.delete('/deleteproduct/:id',deleteproduct)
module.exports=routers
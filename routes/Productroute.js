const express=require('express')
const{getallproducts,createproduct}=require('../controllers/Productcontroller')
const routers=express.Router()
routers.post('/createproducts',createproduct)
routers.get('/getproducts',getallproducts)
module.exports=routers
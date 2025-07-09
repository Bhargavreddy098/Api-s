const express = require('express')
const {createsubcategory,getsubcategories,updatesubcategory,deletesubcategory}=require('../controllers/Subcategorycontroller')
const routers = require('./Productroute')
const router=express.Router()
routers.post('/createsubcategory/:productId',createsubcategory)
routers.get('/getsubcategories/:productId',getsubcategories)
routers.put('/updatesubcategory/:id',updatesubcategory)
routers.delete('/deletesubcategory/:id',deletesubcategory)
module.exports=router  
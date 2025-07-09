const express=require('express')
const router=express.Router()
const {createMenuItem,getAllMenuItems,updateMenuItem,deleteMenuItem,getMenuItemById}=require('../controllers/Menucontroller')

router.post('/createMenuItem',createMenuItem)
router.get('/getAllMenuItems',getAllMenuItems)
router.get('/getMenuItemById/:id',getMenuItemById)
router.put('/updateMenuItem/:id',updateMenuItem)
router.delete('/deleteMenuItem/:id',deleteMenuItem)
module.exports=router   
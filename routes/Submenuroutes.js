const express=require('express')
const router=express.Router()
const{createsubmenu,getSubmenus,updateSubmenu,deleteSubmenu}=require('../controllers/Submenucontroller')
router.post('/createsubmenu/:menuId',createsubmenu)
router.get('/getSubmenus/:menuId',getSubmenus)
router.put('/updateSubmenu/:id',updateSubmenu)
router.delete('/deleteSubmenu/:id',deleteSubmenu)
module.exports=router
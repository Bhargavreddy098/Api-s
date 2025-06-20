const express=require('express')
const { userRegister,userLogin,userLogout,getallusers,updateuser,deleteuser,changePassword,} = require('../controllers/Usercontrollers')
const routers=express.Router()


//Authentication Routes
routers.post('/userregister', userRegister)
routers.post('/userlogin', userLogin)
routers.post('/userlogout', userLogout)


//User Management
routers.get('/users', getallusers)  
// routers.get('/users/:id', getuserbyid)
routers.put('/users/:id', updateuser)
routers.delete('/users/:id',deleteuser)
routers.post('/changepassword',changePassword)
module.exports=routers;
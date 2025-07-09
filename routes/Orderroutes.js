const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrder ,getOrderById,deleteOrder,getOrderStats,getTopSellingItems} = require('../controllers/Ordercontroller');

router.post('/createOrder', createOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getOrderById/:id',getOrderById)
router.get('/getOrderStats',getOrderStats)
router.get('/getTopSellingItems',getTopSellingItems)
router.put('/updateOrder/:id',updateOrder)
router.delete('/deleteOrder/:id',deleteOrder)


module.exports = router;
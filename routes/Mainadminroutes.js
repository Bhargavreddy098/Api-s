const express = require('express');
const router = express.Router();
const {createMainAdmin,getMainAdmin,updateMainAdminPassword,loginMainAdmin} = require('../controllers/Mainadmincontroller');

// Routes for main admin
router.post('/createMainAdmin',createMainAdmin)
router.get('/getMainAdmin/:id',getMainAdmin);
router.post('/loginMainAdmin',loginMainAdmin)
router.put('/updateMainAdminPassword/:id',updateMainAdminPassword);

module.exports = router;
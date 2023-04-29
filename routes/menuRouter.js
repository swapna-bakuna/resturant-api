const express = require('express');
const menurouter = express.Router();
const menuContoller = require('./../controllers/menuController');
const authController = require('./../controllers/authController')
menurouter.post('/addmenu',authController.protect,menuContoller.addmenu);
menurouter.put('/updatemenu/:id',authController.protect,menuContoller.updatemenu);
menurouter.get('/getmenu', menuContoller.getmenu);
menurouter.post('/order' , menuContoller.order);
menurouter.get('/orderstatus',authController.protect ,menuContoller.orderstatus)
menurouter.get('/status/:tableno',authController.protect,menuContoller.updateOrderStatus);
module.exports = menurouter;
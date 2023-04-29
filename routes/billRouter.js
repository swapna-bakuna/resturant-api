const express = require('express');
const menurouter = express.Router();
const authContoller = require('../controllers/authController');
const billController = require('./../controllers/billController');
menurouter.get('/billing/:tableno', billController.billing);
menurouter.get('/paybill/:tableno', billController.payBill);
menurouter.get('/orders/:id', authContoller.protect, billController.getorder);
menurouter.get('/allorderslist', authContoller.protect,billController.getorderslist)
module.exports = menurouter;
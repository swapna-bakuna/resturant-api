const express = require('express');
const userrouter = express.Router();
const userController = require('../controllers/userController')
const authController = require('./../controllers/authController')
userrouter.post('/signup', userController.signup);
userrouter.get('/getusers', userController.getusers)
userrouter.post('/login', authController.login);
module.exports = userrouter;
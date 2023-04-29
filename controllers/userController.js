const { use } = require('../app');
const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
exports.signup = async(req, res)=>{
    try{
        const user = await User.create({
            roles: req.body.roles,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({status: 'success', body: user})
    }catch(err){
        res.status(400).json({status:'fail', message: err.message})
    }
}
exports.getusers = async(req, res)=>{
    try{
        const user = await User.find()
        res.status(200).json({status:'sucess', data:user})
    }catch{
        res.status(404).json({status:'fail', data:err.message})
    }
}
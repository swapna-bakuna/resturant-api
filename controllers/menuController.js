const { use } = require("../app");
const Menu = require("../models/menuModel");
const Order = require('./../models/orderModel');

exports.addmenu = async (req, res) => {
  console.log("data==>", req.body);
  try {
    const newMenu = await Menu.create({ items: req.body.items });
    res.status(201).json({ status: "success", data: newMenu });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.updatemenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.find(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMenu) {
      return res
        .status(404)
        .json({ status: "fail", message: "Menu item not found" });
    }
    res.status(200).json({ status: "success", data: updatedMenu });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.getmenu = async (req, res) => {
  try {
    const itemName = req.query.itemname; 
    const menu = await Menu.find({ "items.itemname": itemName });
    res.status(200).json({ status: "success", data: menu });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
exports.order = async(req, res)=>{
  try{
    const ordering = await Order.create({
      tableno: req.body.tableno,
      userId: req.body.userId,
      items:req.body.items,
      Date:req.body.Date
    })
    res.status(200).json({status:'success', data: ordering})
 }catch(err){
  res.status(400).json({status:'fail', message:err.message})
  }
};
exports.orderstatus = async(req, res)=>{
 try{ const tableno = req.query.tableno
const getorder = await Order.find({tableno})
res.status(200).json({status: 'sucess', data: getorder })
 }catch(err){
  res.status(404).json({status: 'fail', message: err.message})
 }
}
exports.updateOrderStatus = async(req, res)=>{
  try {
    const order = await Order.findOne({ tableno: req.params.tableno });
    order.status = 'completed';
    await order.save();
    order.items = [];
    await order.save();

    res.status(200).json({ status: 'success', message: 'cooking completed' });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
}
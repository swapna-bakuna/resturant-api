const { use } = require("../app");
const User = require('../models/userModel');
const Order = require('../models/orderModel')
const { TokenExpiredError } = require("jsonwebtoken");

exports.billing = async (req, res) => {
  try {
    const order = await Order.findOne({ tableno: req.params.tableno }).select('items');

    if (!order) {
      return res.status(404).json({ status: 'fail', message: 'Order not found' });
    }

    let billItems = order.items.map(({ itemname, price, quantity }) => ({
      itemname,
      price,
      quantity,
      total: price * quantity,
    }));

    const total = billItems.reduce((acc, { total }) => acc + total, 0);

    res.status(200).json({ status: 'success', billItems, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
}
exports.payBill = async (req, res) => {
  try {
    const order = await Order.findOne({ tableno: req.params.tableno });
    order.bill = 'paid';
    await order.save();
    order.items = [];
    await order.save();

    res.status(200).json({ status: 'success', message: 'Bill paid successfully' });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
}
exports.getorder = async (req, res) => {
  try {
    const userId = req.params.id;
    let userData = await User.findOne({ _id: userId });
    let order = await Order.findOne({ userId: userId });
    if (!userData || !order) {
      return res
        .status(404)
        .json({ status: "fail", message: "User or order not found" });
    }
    let result = {
      ...userData._doc,
      ...order._doc,
    };
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.getorderslist = async (req, res) => {
  try {
    let order = await Order.findOne()   
    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

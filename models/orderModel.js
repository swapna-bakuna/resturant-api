const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const orderSchema = mongoose.Schema({
  tableno:{
    type:Number
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
     /* itemId: {
        type: ObjectId,
        required: true,
        ref: "Menu",
      },*/
      itemname:{
        type: String
      },
      price:{
        type: Number
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
    },
  ],
  orderedat: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['cooking', 'completed'],
    default: 'cooking'
  },
  bill: {
    type: String,
    enum: ['paid' , 'unpaid']
  }

});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
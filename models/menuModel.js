const { Module } = require("module");
const mongoose = require("mongoose");
const menumodel = mongoose.Schema({
  items: [
    {
      itemname: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});
const Menu = mongoose.model('Menu', menumodel);
module.exports = Menu;
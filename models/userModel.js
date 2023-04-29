const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
  roles: {
    type: 'string',
    enum: ['user', 'admin']
  },
  email: {
    type: "string",
    unique: true,
    allowNull: false,
  },
  password: {
    type: "string",
    allowNull: false,
    minlength: 8,
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
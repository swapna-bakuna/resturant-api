const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

exports.login =async (req, res)=>{
  const {email, password} = req.body
  //check e, p
  if (!email|| !password){
      return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
  }
  //e =p,
try{
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
}
const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
    console.log(passwordMatch,"=-",password)
    return res.status(401).json({ message: 'Invalid email or password' });
  }
//s t
const token = jwt.sign({id: user._id },  process.env.JWT_SECRET , {
  expiresIn: process.env.JSON_EXPIRES_IN
})
return res.status(200).json({ token, message: 'Login successful' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: 'fail', message: 'Internal server error' });
  }
};
exports.protect = async(req, res, next) => {
  //get t and check e & p
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
      token = req.headers.authorization.split(' ')[1];
  } 
  console.log(token);
  if(!token){
    return res.status(401).json({status: "fail" , body: 'login into acess'});
  }
  //v t
  try {
    // Verify token
    const decrypted = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decrypted);
    // C u exists
    const existsUser = await User.findById(decrypted.id);
    if (!existsUser) {
      return res.status(401).json({ status: 'fail', body: 'user not find' });
    }
    if (existsUser.role == 'admin') {
      return res.status(403).json({ status: 'fail', body: 'Not authorized' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ status: 'fail', body: err.message });
  }
};
/*exports.adminRoute = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'fail', body: 'Not authorized' });
  }
  next();
};*/
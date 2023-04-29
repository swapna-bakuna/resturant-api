const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const userrouter = require('./routes/userRouter');
const menurouter = require('./routes/menuRouter');
const billrouter = require('./routes/billRouter')
mongoose.connect("mongodb://0.0.0.0:27017/resturant")   
  .then(() =>{
    console.log("database is connected sucessfully");
  }).catch((e)=>{ 
    console.log("====error connecting db==",e)
  })
app.use('/api', userrouter)
app.use('/api', menurouter)
app.use('/api', billrouter)
const port = process.env.PORT
app.listen(port,()=>{
    console.log('server is running on the 8080 port number');
})
 
module.exports = app
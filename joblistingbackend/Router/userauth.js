const express=require('express');
const auth = require('../Middleware/jwttoken');
const updateuser = require('../controller/usercontroler');
const userauth=express.Router();
userauth.put('/update-user',auth,updateuser)
module.exports=userauth;
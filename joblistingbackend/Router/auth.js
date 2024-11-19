const express = require('express');
const RegisterControler  = require('../controller/Registercontroler'); 
const logincontroler = require('../controller/logincontroler');
const userdatacontroller = require('../controller/UserdataController');
const router = express.Router();
router.post('/Register', RegisterControler);
router.post('/User', userdatacontroller);
router.post('/login',logincontroler);
module.exports = router;

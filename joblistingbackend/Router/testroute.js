const testcontroller = require('../controller/testcontroller');
const express=require('express');
const router=express.Router();
router.post('/test',testcontroller)
module.exports = router;
var express = require('express');
var router = express.Router();

// Require Models
Employee = require('../models/employees');

router.post('/login',function(req,res){
  // console.log(req.payload.username);
  res.send({ token: 'aeaw9aw03'})
});


module.exports = router;

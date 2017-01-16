var express = require('express');
var router = express.Router();

//default page
router.get('/', function(req,res){
  res.send('Please access /api/');
});


module.exports = router;

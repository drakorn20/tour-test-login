var express = require('express');
var router = express.Router();

// Require Models
Employee = require('../models/employees');

router.post('/login',function(req,res){
  res.send({ token: 'aeaw9aw03'})
});

// Register User
router.post('/register', function(req, res){

	var email = req.body.email;
	var password = req.body.password;
	var confirm = req.body.confirm;
  var nickname = req.body.nickname;
  var name = req.body.name;
  var surname = req.body.surname;
  var role = req.body.role;
  var residence = req.body.residence;
  var phone = req.body.phone;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
  req.checkBody('nickname', 'Nickname is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('surname', 'Surname is required').notEmpty();
  req.checkBody('role', 'Role is required').notEmpty();
  req.checkBody('residence', 'Residence is required').notEmpty();
  req.checkBody('phone', 'Phone is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
			console.log(errors)

	 }else{
		var newEmployee = new Employee({

			email:email,
			password: password,
      nickname: nickname,
      name: name,
      surname: surname,
      role: role,
      residence: residence,
      phone: phone

		});

		Employee.createEmployee(newEmployee, function(err, employee){
			if(err){console.log(err)}
			console.log(employee);
		});
	}
});

module.exports = router;

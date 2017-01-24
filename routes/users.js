var express = require('express');
var router = express.Router();


// Require Models
Employee = require('../models/employees');

router.post('/login',function(req, res) {


    console.log(req.body);

    var username = req.body.payload.username;
    var password = req.body.payload.password;
    var idChecked = false;
    var passChecked = false;
    var isAuthorized = false;

    Employee.getUserByEmail(username, function(err,user){
      console.log("username = "+ username);
      if(user != null){
      console.log("user = "+ user);
        idChecked = true;
        Employee.comparePassword(password, user.password, function(err, isMatch){
          console.log("password =" +password);
          console.log("user.password =" +user.password);
            if(isMatch){
              console.log("password is matched")
              passChecked = true;

              if(idChecked && passChecked){
                isAuthorized = true;
                return console.log("login successful");
              }

            }else{
              return console.log("password is wrong");
            }
        });
      }else{
        return console.log("id is wrong");
      }
    });
  });


// Register User
router.post('/register', function(req, res){

  console.log(req);

	var email = req.body.payload.email;
	var password = req.body.payload.password;
	var confirm = req.body.payload.confirm;
  var nickname = req.body.payload.nickname;
  var name = req.body.payload.name;
  var surname = req.body.payload.surname;
  var role = req.body.payload.role;
  var residence = req.body.payload.residence;
  var phone = req.body.payload.phone;

	// Validation
	req.checkBody('payload.name', 'Name is required').notEmpty();
	req.checkBody('payload.email', 'Email is required').notEmpty();
	req.checkBody('payload.email', 'Email is not valid').isEmail();
	req.checkBody('payload.password', 'Password is required').notEmpty();
	req.checkBody('payload.confirm', 'Passwords do not match').equals(req.body.payload.password);
  req.checkBody('payload.nickname', 'Nickname is required').notEmpty();
  req.checkBody('payload.name', 'Name is required').notEmpty();
  req.checkBody('payload.surname', 'Surname is required').notEmpty();
  req.checkBody('payload.role', 'Role is required').notEmpty();
  req.checkBody('payload.residence', 'Residence is required').notEmpty();
  req.checkBody('payload.phone', 'Phone is required').notEmpty();

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

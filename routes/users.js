var express = require('express');
var router = express.Router();


// Require Models
Employee = require('../models/employees');

router.post('/login',function(req, res) {

    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
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


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//    Employee.getUserByEmail(username, function(err, user){
//    	if(err) throw err;
//    	if(!user){
//    		return done(null, false, {message: 'Unknown User'});
//    	}
//
//    	Employee.comparePassword(password, user.password, function(err, isMatch){
//    		if(err) throw err;
//    		if(isMatch){
//    			return done(null, user);
//    		} else {
//    			return done(null, false, {message: 'Invalid password'});
//    		}
//    	});
//    });
//   }));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   Employee.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });

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

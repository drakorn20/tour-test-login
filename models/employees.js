var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Employee Schema
var employeeSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  nickname:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  surname:{
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true
  },
  residence:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  isAuthorized:{
    type: Boolean,
    default: false
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Employee = module.exports = mongoose.model('Employee',employeeSchema);

//Get Employee
module.exports.getEmployees = function(callback, limit){
  Employee.find(callback).limit(limit);
}

//Get Employee by id
module.exports.getEmployeeById = function(id, callback){
  Employee.find(id, callback);
}

//Get Employee with authrized equal false
module.exports.getPendingEmployees = function(callback){
  Employee.find(
    {isAuthorized: false}
    ,callback);
}

//Get Guide
module.exports.getTourGuide = function(callback){
  Employee.find(
   {
    role: "Tour Guide",
     isAuthorized: true
   }, callback
  );
}
//Add Employee
// module.exports.createEmployee = function(employee, callback){
//   Employee.create(employee, callback);
// }

//Hash password
module.exports.createEmployee = function(employee, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(employee.password, salt, function(err, hash) {
	        employee.password = hash;
	        employee.save(callback);
	    });
	});
}


//Update Employee
module.exports.updateEmployee = function(id, employee, option, callback){
  var query = {_id: id};
  var update = {
    email : employee.email,
    password: employee.password,
    nickname: employee.nickname,
    name: employee.name,
    surname: employee.surname,
    role: employee.role,
    residence: employee.residence,
    phone: employee.phone
  }
  Employee.findOneAndUpdate(query, update, option, callback);
}

//Delete Employee
module.exports.deleteEmployee = function(id, callback){
  var query = {_id: id};
  Employee.remove(query, callback);
}

//Get User by Email
module.exports.getUserByEmail = function(username, callback){
	var query = {email: username};
	Employee.findOne(query, callback);
}

//Get User by Id
module.exports.getUserById = function(id, callback){
	Employee.findById(id, callback);
}

//compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

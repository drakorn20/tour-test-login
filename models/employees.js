var mongoose = require('mongoose');

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

//Add Employee
module.exports.addEmployee = function(employee, callback){
  Employee.create(employee, callback);
}

//Update Employee
module.exports.updateEmployee = function(id, employee, option, callback){
  var query = {_id: id};
  var update = {
    email : employee.name,
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

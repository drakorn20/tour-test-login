var express = require('express');
var router = express.Router();

// Require Models
Employee = require('../models/employees');


//Get all employee
router.get('/', function(req,res){
    Employee.getEmployees(function(err, employees){
      if(err){
        throw err;
      }
      res.json(employees);
    });
});

//Get all approved Tour Guide
router.get('/tour-guide', function(req,res){
    Employee.getTourGuide(function(err, employee){
      if(err){
        throw err;
      }
      res.json(employees);
    });
});

router.post('/pending', function(req,res){
  for(var i=0; i < req.body.payload.length; i++){
    Employee.setAuthorized(req.body.payload[i].id, function(err, employee){
        if(err){
          console.log(err);
        }
          console.log(employee);
    });
  }

});

// Get sppecific employee id
// router.get('/:_id', function(req,res){
//     Employee.getEmployeeById(req.params._id, function(err, employees){
//       if(err){
//         throw err;
//       }
//       res.json(employees);
//     });
// });

// Create new employee
// router.post('/register', function(req,res){
//     var employee = req.body;
//     Employee.addEmployee(employee, function(err, employee){
//       if(err){
//         throw err;
//       }
//       res.json(employee);
//     });
// });

// Update emplotee information
// router.put('/update/:_id', function(req,res){
//     var id = req.params._id;
//     var employee = req.body;
//     Employee.updateEmployee( id, employee, {}, function(err, employee){
//       if(err){
//         throw err;
//       }
//       res.json(employee);
//     });
// });

//Delete specific employee
// router.delete('/delete/:_id', function(req,res){
//     var id = req.params._id;
//       Employee.deleteEmployee( id, function(err, employee){
//       if(err){
//         throw err;
//       }
//       res.json(employee);
//     });
// });

module.exports = router;

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

router.post('/m', function(req, res) {
  var movie = req.body.data;
  console.log('/movies route hit with movie:', movie);
  res.send('ok from server');
});

module.exports = router;
//
// // Defines HOW Documents will be saved to the Database
// var MovieSchema = mongoose.Schema({
//   title : String,
//   director: String,
//   salary: Number,
//   status: Boolean
// });
//
// /*
//   Employees - Is a reference to the collection when finding things in the DB,
//   Employees - Is a reference to the Schema, when we are saving things to the DB.
// */
// var Employees = mongoose.model("Employees", EmployeeSchema);
//
// //GET employees
// router.get("/", function(req,res){
//   //Get all employees
//   Employees.find(function(err, allEmployees){
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }
//     res.send(allEmployees);
//   });
// });
//
// //Save a new employee
// router.post("/", function(req,res){
//   //Instance of the Model to be saved to the database
//   var employee = new Employees();
//   employee.name = req.body.name;
//   employee.position = req.body.position;
//   employee.salary = req.body.salary;
//   employee.status = true;
//   employee.save(function(err, savedEmployee){
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     res.send(savedEmployee);
//   });
// });
//
// //Delete an employee
// router.delete("/", function(req,res){
//   //Delete an employee
//   // { "id" : "83275019375918538?"}
//   var id = req.body.id;
//   Employees.findByIdAndRemove(id, function(err, deletedEmployee){
//     /*
//       if(undefined){} - False Value
//       if("Some Error Code"){} - True Value
//     */
//
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     res.send(deletedEmployee);
//   });
// });
//
// router.put("/", function(req,res){
//   var employee = req.body;
//   Employees.findById(employee.id, function(err, foundEmployee){
//       if(err){
//         console.log(err);
//         res.sendStatus(500);
//       }
//
//       // MAKE UPDATES TO EMPLOYEE RETURNED FROM DATABASE
//       // foundEmployee.name = req.body.name;
//       // foundEmployee.position = req.body.position;
//       // foundEmployee.salary = req.body.salary;
//       foundEmployee.status = !foundEmployee.status;
//
//       foundEmployee.save(function(err, savedEmployee){
//         if(err){
//           console.log(err);
//           res.sendStatus(500);
//         }
//
//         res.send(savedEmployee);
//       });
//   });
// });

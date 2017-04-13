var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Defines HOW Documents will be saved to the Database
var MovieSchema = {
  title: String,
  imdbID: String
};

// ModelName = mongoose.model('ModelName', SchemaVariableName, 'CollectionName')
var Movies = mongoose.model('movies', MovieSchema, 'movies');

// GET all movies
router.get('/', function(req, res) {
  Movies.find(function(err, allMovies){
    if(err){
      console.log('error getting all movies:', err);
      res.sendStatus(500);
    }
    res.send(allMovies);
  });
}); // end GET all movies

// POST a new favorite movie
router.post('/', function(req, res) {
    // Instance of the Model to be saved to the database
    var movie = new Movies({
      title: req.body.Title,
      imdbID: req.body.imdbID
    });
    movie.save(function(err, savedMovie){
      if(err){
        console.log('error saving movie', err);
        res.sendStatus(500);
      }
      console.log('saved:', movie.title, 'imdbID:', movie.imdbID);
      res.send(savedMovie);
    });
}); // end POST a new favorite movie

// DELETE a movie from the database
router.delete("/:imdbID", function(req,res) {
  // Delete a movie given the imdbID
  // { "imdbID" : "tt0030386"}
  console.log('delete request on /movies route with params:', req.params);
  var imdbID = req.params.imdbID;
    // Employees.findByIdAndRemove(id, function(err, deletedEmployee){
  //   /*
  //     if(undefined){} - False Value
  //     if("Some Error Code"){} - True Value
  //   */
  //
  //   if(err){
  //     console.log(err);
  //     res.sendStatus(500);
  //   }
  //
    res.send(imdbID);
  // });
});

module.exports = router;

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

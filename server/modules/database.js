var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/movies'; // connection string for our movies database
var database = mongoose.connect(mongoURI).connection; // establish database connection

// handle any database connection errors
database.on('error', function(err) {
  console.log('Mongo connection error: ', err);
});

// confim connection
database.once('open', function() {
  console.log('connected to our Mongo database: ', mongoURI);
});

module.exports = database;

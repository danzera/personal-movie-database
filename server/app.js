var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./modules/database.js');
var index = require('./routes/index.js');
var movies = require('./routes/movies.js')

app.set('port', (process.env.PORT || 5000));

app.use(express.static('server/public')); // default file path
app.use(bodyParser.json()); // required for Angular
app.use(bodyParser.urlencoded({extended: true})); // hook-up bodyParser

app.use('/m', movies); // '/movies' route
app.use('/', index); // base URL

app.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});

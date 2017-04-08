var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('server/public')); // default file path

app.use(bodyParser.urlencoded({extended: true})); // hook-up bodyParser

app.use('/', index); // base URL

app.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});

var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/release',{ maxAge: 0 }));

port = 3001;
app.listen(port);
console.log('Listening on port ' + port);
console.log('Go to http://localhost:' + port + ' in your browser.');

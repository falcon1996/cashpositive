'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = process.cwd();
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var Collection = require('postman-collection').Collection;

var app = express();
require('dotenv').load();

app.use(cookieParser());
//app.set('view engine', 'html');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var myCollection = new Collection(JSON.parse(fs.readFileSync('mycollection.json').toString()));
//console.log(myCollection.toJSON());


app.get('/', function(req, res) {    
    res.json({input:'Welcome to 8081'});
});



http.createServer(app).listen(8081, function(){
    console.log("App listning on port 8081");
});
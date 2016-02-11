'use strict';

const port = 8000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const mongoUrl = "mongodb://localhost:27017/test";
const mongoCollection = "gargantua";
const mongo = require("./mongo.js")(mongoUrl, mongoCollection);

const pushPostHandler = function(req, res) {
    console.log("Received POST : " + JSON.stringify(req.body));
    mongo.insert(req.body, function(){
        console.log("Stored with _id : " + req.body._id);
        res.json(req.body);
    });
};

// Add the routes
app.get('/', function(req, res) {
    res.render('index', { title: 'Home', h1: 'Gargantua'});
});
app.get('/hello', function(req, res) {
    res.json({answer: 'hello world'});
});
app.post('/push', pushPostHandler);
app.get('/test', function(req, res){
    res.render('test', { title: 'test', h1: 'Gargantua - test-page'});
});

// Start the server
app.listen(port, function() {
    console.log('Example app listening on http://localhost:' + port + ' ...');
});

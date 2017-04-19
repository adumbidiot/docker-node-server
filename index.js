const express = require('express');
const app = express();
const handlebars = require('handlebars');
const fs = require('fs');
const PORT = '8080';
var source;

source = fs.readFileSync("utf8", __dirname + "/views/index.hbs");
var index = handlebars.compile(source);

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.get('/', function(req, res){
	res.send(index());
});

app.get('/tools', function(req, res){
	res.sendFile(__dirname + '/public/tools.html');
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

app.listen(PORT);

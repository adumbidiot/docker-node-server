const express = require('express');
const app = express();
const handlebars = require('handlebars');
const PORT = '8080';

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/tools', function(req, res){
	res.sendFile(__dirname + '/public/tools.html');
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

app.listen(PORT);

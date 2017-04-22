const express = require('express');
const app = express();
const handlebars = require('./handlebars');

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.get('/', function(req, res){
	res.render('games');
});

app.get('/platformer', function(req, res){
	res.render('platformer');
});

app.get('/platformer/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/logic.js');
});

app.get('/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/test.swf');
});

module.exports = app;

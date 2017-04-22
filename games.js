const express = require('express');
const app = express();
const request = require('request');
const handlebars = require('./handlebars');
const bodyparser = require('body-parser');
var scores = [];

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.render('games');
});

app.get('/games/platformer.swf', function(req, res){
	request.get('http://nanopi.ddns.net/api/platformer.swf').pipe(res);
});

app.get('/platformer', function(req, res){
	res.render('platformer');
});

app.post('/platformer/score', function(req, res){
	console.log(req.body.time);
	scores.push(req.body.time);
	res.send('ok');
});

app.get('/platformer/score', function(req, res){
	res.json(scores);
});

app.get('/platformer/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js');
});

app.get('/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/test.swf');
});

module.exports = app;

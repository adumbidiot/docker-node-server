const express = require('express');
const app = express();
const request = require('request');
const handlebars = require('./handlebars');
const bodyparser = require('body-parser');
var scores = ["179.83333333046835", "153.24999999755812"];

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.render('games');
});

app.get('/platformer.swf', function(req, res){
	request.get('http://nanopi.ddns.net/api/platformer.swf').pipe(res);
});

app.get('/platformer', function(req, res){
	res.render('platformer');
});

app.post('/platformer/score', function(req, res){
	//Recieve Response
	var score = req.body.time;
	console.log(score);
	res.send('ok');
	
	//Order score list
	var index = 0;
	for(var i = 0; i != scores.length; i++){
		if(score >= scores[i]){
			scores.splice(i, 0, score);
			break;
		}
	}
	//scores.push(score);
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

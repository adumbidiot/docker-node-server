const express = require('express'); //TODO: Replace with Koa or better framework
const app = express(); //Replace with own hashtable-enabled router?
const request = require('request'); //Maybe move to api.js 
const handlebars = require('./handlebars');
const bodyparser = require('body-parser'); //Maybe move to api.js
var scores = [
		"93.70833333183913",
		"94.37499999849518",
		"99.04166666508758",
		"101.45833333171578",
		"102.33333333170185",
		"102.8749999983599",
		"104.166666665006", 
		"110.66666666490255",
		"153.24999999755812", 
		"179.83333333046835",
		"276.41666666226445"
]; // Test runs

app.engine('.hbs', handlebars.engine); //Modularity could be improved
app.set('view engine', '.hbs'); //Easier to type
app.enable('view cache'); //I rebuild the image every time so why not

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.render('games');
});

app.get('/platformer.swf', function(req, res){
	request.get('http://nanopi.ddns.net/api/platformer.swf').pipe(res); //Temporary quick fix until I copy the code
});

app.get('/platformer', function(req, res){
	res.render('platformer');
});

app.post('/platformer/score', function(req, res){
	//Recieve Response
	//TODO: Ignore values after 2nd decimal
	var score = req.body.time;
	console.log(score);
	res.send('ok');
	
	//Order score list
	for(var i = 0; i != scores.length; i++){
		if(Number(score) < Number(scores[i])){
			scores.splice(i, 0, score);
			return;
		}
	}
	//TODO: ADD removal for entries over the limit of 10
	scores.push(score);
});
//Maybe move to its own file(repetetive)
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

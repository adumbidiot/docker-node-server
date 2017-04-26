const express = require('express'); //TODO: Replace with Koa or better framework
const app = express(); //Replace with own hashtable-enabled router?
const request = require('request'); //Maybe move to api.js 
const handlebars = require('./handlebars');
//const platformer = require('./games/platformer');
const bodyparser = require('body-parser'); //Maybe move to api.js
//Don't look at me like that. I don't have a database yet.
var scores = [
	"91.99999999853299",
	"93.70833333183913",
	"94.04166666516715",
	"94.37499999849518",
	"95.04166666515124",
	"95.08333333181724",
	"96.24999999846534",
	"97.83333333177347",
	"99.04166666508758",
	"101.45833333171578"
]; //The worst way to maintain state but I still need to set up a database

app.engine('.hbs', handlebars.engine); //Modularity could be improved
app.set('view engine', '.hbs'); //Easier to type
app.enable('view cache'); //I rebuild the image every time so why not
//TODO: Reorder for efficiency to eliminate unnecessary parsing
app.use(bodyparser.urlencoded({
  extended: true
}));//Parse post requests

app.get('/', function(req, res){
	res.render('games');
});

app.get('/platformer.swf', function(req, res){
	request.get('http://nanopi.ddns.net/api/platformer.swf').pipe(res); //Temporary quick fix until I copy the code
});
//Maybe move to its own file(repetetive)
app.get('/platformer', function(req, res){
	res.render('platformer');
});

app.post('/platformer/score', function(req, res){
	//Recieve Response
	//TODO: Ignore values after 2nd decimal
	var score = req.body.time; //Convieniece
	console.log(score);//WOW!!! Basic logging!
	res.send('ok');//TODO: ADD errors and states
	
	//Order score list
	for(var i = 0; i != scores.length; i++){
		if(Number(score) < Number(scores[i])){
			scores.splice(i, 0, score); //insert score
			scores.length = 10; //Prune to 10
			return; //end function
		}
	}
	scores.length = 10; //Prune to 10 (Do I really need to prune if no data is added?)
});

app.get('/platformer/score', function(req, res){
	res.json(scores);
});

app.get('/platformer/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js');//Fix file name plz 
});

app.get('/platformer/platformer.jpg', function(req, res){
	res.sendFile(__dirname + '/public/games/platformer.jpg');
});

app.get('/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/test.swf'); //TODO: Clean code and rename SWF
});

//app.use('/platformer', platformer);

module.exports = app;

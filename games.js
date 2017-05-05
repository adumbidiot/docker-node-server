const express = require('express'); //TODO: Replace with Koa or better framework
const app = express(); //Replace with own hashtable-enabled router?
const request = require('request'); //Maybe move to api.js 
const handlebars = require('./handlebars');
const platformer = require('./platformer');
const bodyparser = require('body-parser'); //Maybe move to api.js
//Don't look at me like that. I don't have a database yet.
var scores = [
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999",
	"999.999"
]; //The worst way to maintain state but I still need to set up a database

app.engine('.hbs', handlebars.engine); //Modularity could be improved
app.set('view engine', '.hbs'); //Easier to type
app.enable('view cache'); //I rebuild the image every time so why not
//TODO: Reorder for efficiency to eliminate unnecessary parsing
app.use(bodyparser.urlencoded({
  extended: true
}));//Parse post requests

app.get('/', function(req, res){
	res.render('games', {games: true, auth: req.auth});
});

app.get('/platformer.swf', function(req, res){
	res.redirect('https://nanopi.ml/api/Platformer_60fps.swf');
	//request.get('http://nanopi.ddns.net/api/platformer.swf').pipe(res); //Temporary quick fix until I copy the code
});
//Maybe move to its own file(repetetive)

app.post('/platformer/score', function(req, res){
	//Recieve Response
	//TODO: Ignore values after 2nd decimal
	var score = req.body.time; //Convieniece
	console.log(score); //WOW!!! Basic logging!
	res.send('ok'); //TODO: ADD errors and states
	
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

app.use('/platformer', platformer);

module.exports = app;

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var scores = [
	{name: 'NONE', score: '999.999'},
	{name: 'NONE ', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'}
];

app.use(bodyparser.urlencoded({
  extended: true
}));

app.post('/platformer/score', function(req, res){
	//Recieve Response
	//TODO: Ignore values after 2nd decimal
	var score = req.body.time;
	var name = req.body.name;//Convieniece
	console.log(score + ' | ' + name); //WOW!!! Basic logging!
	res.send('ok'); //TODO: ADD errors and states
	
	//Order score list
	for(var i = 0; i != scores.length; i++){
		if(Number(score) < Number(scores[i].score)){
			scores.splice(i, 0, {name: name, score: score}); //insert score
			scores.length = 10; //Prune to 10
			return; //end function
		}
	}
	scores.length = 10; //Prune to 10 (Do I really need to prune if no data is added?)
});

app.get('/platformer/score', function(req, res){
	res.json(scores);
});

app.get('/', function(req, res){
	res.render('platformer', {games: true, auth: req.auth});
});

app.get('/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js');//Fix file name plz 
});

app.get('/platformer.jpg', function(req, res){
	res.sendFile(__dirname + '/public/games/platformer.jpg');
});

module.exports = app;

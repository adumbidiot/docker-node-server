const express = require('express');
const app = express();
const db = require('./db').scoreboard.skeletonsprint;
const bodyparser = require('body-parser');
var scores = [
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'},
	{name: 'NONE', score: '9999.9999'}
];

db.load().then(function(data){
	scores = data;
}).catch(console.log);

app.use(bodyparser.urlencoded({
  extended: true
}));

app.post('/score', function(req, res){
	var score = req.body.time;
	var name = req.body.name;
	console.log(score + ' | ' + name);
	res.send('ok'); //TODO: ADD errors and states
	
	//Order score list
	for(var i = 0; i != scores.length; i++){
		if(Number(score) < Number(scores[i].score)){
			scores.splice(i, 0, {name: name, score: score}); //insert score
			scores.length = 10; //Prune to 10
			db.save(scores);
			return; //end function
		}
	}
	scores.length = 10; //Prune to 10 (Do I really need to prune if no data is added?)
	db.save(scores);
});

app.get('/score', function(req, res){
	res.json(scores);
});

app.get('/', function(req, res){
	res.render('platformer', {games: true, auth: req.auth});
});

app.get('/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js'); //Fix file name plz 
});

app.get('/platformer.jpg', function(req, res){
	res.sendFile(__dirname + '/public/games/platformer.jpg');
});

app.get('/customLevel.txt', function(req, res, next){
	console.log(req.cookies);	
});

app.use(express.static('./public/games/platformer'));
module.exports = app;

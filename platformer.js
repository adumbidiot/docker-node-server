const express = require('express');
const app = express();

app.get('/', function(req, res){
	res.render('platformer', {games: true});
});

app.get('/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js');//Fix file name plz 
});

app.get('/platformer.jpg', function(req, res){
	res.sendFile(__dirname + '/public/games/platformer.jpg');
});

app.get('/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/loader.swf'); //TODO: Clean code and rename SWF
});

module.exports = app;

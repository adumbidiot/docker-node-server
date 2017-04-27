const express = require('express');
const app = express();

app.get('/platformer/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/games/logic.js');//Fix file name plz 
});

app.get('/platformer/platformer.jpg', function(req, res){
	res.sendFile(__dirname + '/public/games/platformer.jpg');
});

app.get('/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/loader.swf'); //TODO: Clean code and rename SWF
});

module.exports = app;

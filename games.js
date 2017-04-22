const express = require('express');
const app = express();

app.get('/platformer/logic.js', function(req, res){
	res.sendFile(__dirname + '/public/logic.js');
});

app.get('/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/test.swf');
});

module.exports = app;

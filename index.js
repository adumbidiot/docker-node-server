const express = require('express');
const app = express();
const PORT = '8080';

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT);

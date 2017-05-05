const express = require('express');
const app = express();
const request = require('request');

app.get('/Platformer_60fps.swf', function(req, res){
	request.get('https://sctiger1311.github.io/Skeleton-Sprint/Platformer_60fps.swf').pipe(res);	
});

app.use(function(req, res){
	res.redirect('https://www.nanopi.ml' + req.path);
});

module.exports = app;

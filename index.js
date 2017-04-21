const express = require('express');
const app = express();
const config = require('./config');
const exhbs = require('express-handlebars');

app.engine('.hbs', exhbs(config.exhbs));
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/games', function(req, res){
	res.render('games');
});

app.get('/games/platformer', function(req, res){
	res.render('platformer');
});

app.get('/games/platformer/test.swf', function(req, res){
	res.sendFile(__dirname + '/public/test.swf');
});

app.get('/games/platformer.swf', function(req, res){
	res.redirect('https://nanopi.ml/api/platformer.swf');
});

app.get('/tools', function(req, res){
	res.render('tools');
});

app.get('/api*', function(req, res){
	res.redirect('https://www.nanopi.ml/api' + req.path);
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

app.listen(config.PORT, function(){
	console.log('Server running at port ' + config.PORT);	
});

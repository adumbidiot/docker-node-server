const express = require('express');
const app = express();
const config = require('./config');
const games = require('./games');
const handlebars = require('./handlebars');

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.use('/games', games);

app.get('/', function(req, res){
	res.render('index');
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

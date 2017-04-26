const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const config = require('./config');
const games = require('./games');
const api = require('./api');
const handlebars = require('./handlebars');
const uws = require('uws');
const uwss = new uws.Server({noServer: true});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.use('/games', games);
app.use('/api', api);

app.get('/', function(req, res){
	res.render('index');
});

app.get('/favicon.ico', function(req, res){
	res.sendFile(__dirname + '/public/favicon.ico');
});

app.get('/tools', function(req, res){
	res.render('tools');
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

server.listen(config.PORT, function(){
	console.log('Server running at port ' + config.PORT);	
});

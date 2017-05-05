const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const config = require('./config');
const games = require('./games');
const api = require('./api');
const login = require('./login');
const admin = require('./admin');
const handlebars = require('./handlebars');
const uws = require('uws');
const jwt = require('jsonwebtoken');
const scoreboard = require('./scoreboard');
const secret = 'thecakewasalie';
const cookieparser = require('cookie-parser');
const uwss = new uws.Server({noServer: true});
const chat = new uws.Server({noServer: true});

server.on('upgrade', function(req, sock, head){
	if(req.path == '/chat'){
		chat.handleUpgrade(req, sock, head, function(){
			console.log('New Chat Client');	
		});	
	}else{
		uwss.handleUpgrade(req, sock, head, function(){
			console.log(req.url);	
		});
	}
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
	console.log(req.path);
	next();
});
app.use(cookieparser());
app.use(function(req, res, next){
  jwt.verify(req.cookies.auth, secret, function(err, decoded){
    if(err){
	    req.auth = false;
    }else{
	  req.auth = decoded;  
    }
	next();  
  });
});
app.use('/games', games);
app.use('/api', api);
app.use('/login', login);
app.use('/admin', admin);

app.get('/', function(req, res){
	res.render('index', {home: true, auth: req.auth});
});

app.get('/favicon.ico', function(req, res){
	res.sendFile(__dirname + '/public/favicon.ico');
});

app.get('/tools', function(req, res){
	res.render('tools', {tools: true, auth: req.auth});
});

app.get('/chat', function(req, res){
	res.render('chat', {chat: true, auth: req.auth});
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

server.listen(config.PORT, function(){
	console.log('Server running at port ' + config.PORT);
	console.log('ADMIN is '  + config.auth.username);
});
handlebars.attach([app]);

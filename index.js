const express = require('express');
const app = express();
const config = require('./config');
const games = require('./games');
const api = require('./api');
const handlebars = require('./handlebars');

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

app.get('/tools', function(req, res){
	res.render('tools');
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

app.listen(config.PORT, function(){
	console.log('Server running at port ' + config.PORT);	
});

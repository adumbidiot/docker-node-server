const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const PORT = '8080';

app.engine('.hbs', exhbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/tools', function(req, res){
	res.render('tools');
});

app.use(function(req, res){
	res.sendFile(__dirname + '/public/err.html');
});

app.listen(PORT);

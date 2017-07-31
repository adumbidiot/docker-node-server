const express = require('express');
const handlebars = require('./handlebars')
const app = express();

handlebars.attach([app]);

app.get('/', function(req, res){
	res.render('jsnes');	
});

app.use(express.static('public/games/jsnes'));

module.exports = app;

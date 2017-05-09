const express = require('express'); //TODO: Replace with Koa or better framework
const app = express(); //Replace with own hashtable-enabled router?
const http = require('http'); //Maybe move to api.js 
const handlebars = require('./handlebars');
const platformer = require('./platformer');
const through2 = require('through2');
const fs = require('fs');
const bodyparser = require('body-parser'); //Maybe move to api.js
//Don't look at me like that. I don't have a database yet.
var scores = [
	{name: 'gffvd', score: '145.1666666086068'},
	{name: 'Sans ', score: '155.88333327098732'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'},
	{name: 'NONE', score: '999.999'}
]; //The worst way to maintain state but I still need to set up a database
var ip = null;

handlebars.attach([app]);

app.get('/', function(req, res){
	res.render('games', {games: true, auth: req.auth});
});

//TODO: Reorder for efficiency to eliminate unnecessary parsing
app.use(bodyparser.urlencoded({
  extended: true
}));//Parse post requests

//Maybe move to its own file(repetetive)
app.post('/platformer/score', function(req, res){
	//Recieve Response
	//TODO: Ignore values after 2nd decimal
	var score = req.body.time;
	var name = req.body.name;//Convieniece
	console.log(score + ' | ' + name); //WOW!!! Basic logging!
	res.send('ok'); //TODO: ADD errors and states
	
	//Order score list
	for(var i = 0; i != scores.length; i++){
		if(Number(score) < Number(scores[i].score)){
			scores.splice(i, 0, {name: name, score: score}); //insert score
			scores.length = 10; //Prune to 10
			return; //end function
		}
	}
	scores.length = 10; //Prune to 10 (Do I really need to prune if no data is added?)
});

app.get('/platformer/score', function(req, res){
	res.json(scores);
});

app.use('/platformer', platformer);

app.get('/moomoo.io', function(req, res){
	http.get('http://moomoo.io', function(response){
		res.writeHead(200, response.headers);
		//response.pipe(fs.createWriteStream(__dirname + '/public/games/moomoo.io/moomoo.io.html'));
		response.pipe(through2(function(chunk, enc, cb){
			var data = chunk;
			if(chunk.indexOf('var serverAddress = "') != -1){
				let i = chunk.indexOf('var serverAddress = "');
				var j = chunk.indexOf('"', i + 21);
				ip = chunk.slice(i + 21, j).toString('utf8');
				console.log(ip);
				i = null;
				buf1 = null;
				buf2 = null;
				buf3 = null;
				//var buf1 = chunk.slice(0, i + 21);
				//var buf2 = Buffer.from('nanopi.ml/games/moomoo.io/bundle.js');
				//var buf3 = chunk.slice(j, chunk.length);
				//data = Buffer.concat([buf1, buf2, buf3], buf1.length + buf2.length + buf3.length); 
			}
			
			if(data.indexOf('"http://" + serverAddress + ":3000/bundle.js"') != -1){
				var i = data.indexOf('"http://" + serverAddress + ":3000/bundle.js"');
				var buf1 = data.slice(0, i + 1);
				var buf2 = Buffer.from('https://nanopi.ml/games/moomoo.io/bundle.js');
				var buf3 = data.slice(i + 5, data.length);
				data = Buffer.concat([buf1, buf2, buf3]); 
				console.log(chunk.toString('utf8'));
			}
			this.push(data);
			cb();
		})).pipe(res);
	});
});

app.get('/moomoo.io/bundle.js', function(req, res){
	//http.get('http://' + ip);	
});

module.exports = app;

const express = require('express'); //TODO: Replace with Koa or better framework
const app = express(); //Replace with own hashtable-enabled router?
const http = require('http'); //Maybe move to api.js 
const handlebars = require('./handlebars');
const platformer = require('./platformer');
const jsnes = require('./jsnes');
const through2 = require('through2');

app.get('/', function(req, res){
	res.render('games', {games: true, auth: req.auth});	
});

app.use('/platformer', platformer);
app.use('/jsnes', jsnes);

app.get('/moomoo.io', function(req, res){
	http.get('http://moomoo.io', function(response){
		var ip = null;
		var headers = response.headers;
		delete headers['content-length'];
		headers['transfer-encoding'] = 'chunked';
		res.writeHead(200, headers);
		//response.pipe(fs.createWriteStream(__dirname + '/public/games/moomoo.io/moomoo.io.html'));
		response.pipe(through2(function(chunk, enc, cb){
			var data = chunk;
			if(chunk.indexOf('var serverAddress = "') != -1){
				let i = chunk.indexOf('var serverAddress = "');
				var j = chunk.indexOf('"', i + 21);
				ip = chunk.slice(i + 21, j).toString('utf8');
				var buf1 = data.slice(0, i + 21);
				var buf2 = Buffer.from('nanopi.ml;');
				var buf3 = data.slice(j);
				data = Buffer.concat([buf1, buf2, buf3]);
			}
			
			if(data.indexOf('"http://" + serverAddress + ":3000/bundle.js"') != -1){
				var i = data.indexOf('"http://" + serverAddress + ":3000/bundle.js"');
				var buf1 = data.slice(0, i + 1);
				var buf2 = Buffer.from('https://nanopi.ml/games/moomoo.io/bundle.js?ip=' + ip);
				var buf3 = data.slice(i + 44, data.length);
				data = Buffer.concat([buf1, buf2, buf3]); 
			}
			
			if(data.indexOf('<link rel="stylesheet"') != -1){
				var i = data.indexOf('<link rel="stylesheet"');
				var buf1 = data.slice(0, i);
				var buf2 = Buffer.from('<link rel="stylesheet" href="https://nanopi.ml/games/moomoo.io/css/main.css"/>');
				var buf3 = data.slice(i + 46, data.length);
				data = Buffer.concat([buf1, buf2, buf3]); 
			}
			
			this.push(data);
			cb();
		})).pipe(res);
	});
});

app.get('/moomoo.io/bundle.js', function(req, res){
	http.get('http://' + req.query.ip + ':3000/bundle.js', function(response){
		var headers = response.headers;
		var c = 0;
		headers['content-type'] = 'text/javascript; charset=utf-8';
		headers['transfer-encoding'] = 'chunked';
		delete headers['content-length'];
		res.writeHead(200, headers);
		response.pipe(through2(function(chunk, enc, cb){
			var data = chunk;
			if(data.indexOf('\x68\x74\x74\x70\x3A') != -1){
				var i = data.indexOf('\x68\x74\x74\x70\x3A');
				console.log(data);
				var buf1 = data.slice(0, i + 4);
				var buf2 = Buffer.from('\x73', 'utf8');
				var buf3 = data.slice(i + 4, data.length); 
				data = Buffer.concat([buf1, buf2, buf3]);
			}
			this.push(chunk);
			cb();
		})).pipe(res);
		//response.pipe(res);
	}).on('error', console.error);	
});

app.get('/moomoo.io/css/main.css', function(req, res){
	http.get('http://moomoo.io/css/main.css', function(response){
		//var headers = response.headers;
		//res.writeHead(200, headers);
		response.pipe(res);
	}).on('error', console.error);	
});

app.get('/webnes', function(req, res){
	res.render('webnes');	
});


app.get('/rom', function(req, res){
	res.render('rom', {games: true, auth: req.auth});	
});

app.get('/jsnes/jsnes.png', function(req, res){
	res.sendFile(__dirname + '/public/games/jsnes.png');	
});

app.use('/webnes', express.static('/public/games/webnes'));
app.use('/webn.es', express.static('/public/games/webn.es'));
app.use('/rom', express.static('public/games/rom'));

module.exports = app;

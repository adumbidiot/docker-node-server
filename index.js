const express = require('express');
const app = express();
const PORT = '8080';

app.use(function(req, res, next){
	console.log(req.path);
	next();
});

app.use(function(req, res){
	res.send('<html><body><p>UNDER DEVELOPMENT!</p><a href = "www.nanopi.ml">Try Here in the meantime!</a></body></html>');
});

app.listen(PORT);

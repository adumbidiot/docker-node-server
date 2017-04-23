const express = require('express');
const app = express();

app.use(function(req, res){
	res.redirect('https://www.nanopi.ml' + req.path);
});

module.exports = app;

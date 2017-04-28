const express = require('express');
const app = express();
const handlebars = require('./handlebars');

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(function(req, res, next){
  if(req.auth){
    return next();
  }
  return res.redirect('https://nanopi.ml/');
});

app.get('/', function(req, res){
  res.render('admin', {admin: true, auth: req.auth});
});

module.exports = app;

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const handlebars = require('./handlebars');
const config = require('./config');
const secret = 'thecakewasalie';

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(cookieparser());

app.use(function(req, res, next){
  if(req.auth){
    return res.redirect('/');
  }
  return next();
});

app.get('/', function(req, res){
  res.render('login', {login: true, auth: req.auth});
});

app.post('/', function(req, res){
  var profile = config.auth;
  
  if(req.body.username === profile.username && req.body.password === profile.password){
    var token = jwt.sign(profile, secret);
    res.cookie('auth', token, {expires: new Date(Date.now() + 900000), httpOnly: true, secure: true});
    res.redirect('/');
  }else{
    res.redirect('login');
  }
});

module.exports = app;

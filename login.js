const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const handlebars = require('./handlebars');
const secret = 'thecakewasalie';

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(cookieparser());

app.get('/', function(req, res, next){
  res.render(login, {login: true});
});

module.exports = app;

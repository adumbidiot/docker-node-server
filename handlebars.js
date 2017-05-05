const exhbs = require('express-handlebars');
const config = require('./config');
const handlebars = exhbs.create(config.exhbs);
module.exports = handlebars;
module.exports.attach = function(array){
  for(var i in array){
    array[i].engine('.hbs', handlebars.engine);
    array[i].set('view engine', '.hbs');
    array[i].enable('view cache');
  }
}

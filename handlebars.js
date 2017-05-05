const exhbs = require('express-handlebars');
const config = require('./config');

module.exports = exhbs.create(config.exhbs);
module.exports.attach = function(array){
  for(var i in array){
    array[i].engine('.hbs', handlebars.engine);
    array[i].set('view engine', '.hbs');
    array[i].enable('view cache');
  }
}

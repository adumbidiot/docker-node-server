const exhbs = require('express-handlebars');
const config = require('./config');

module.exports = exhbs.create(config.exhbs);
module.exports.attach = function(array){
  for(var i in array){
    console.log(array[i]);
  }
}

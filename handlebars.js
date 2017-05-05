const exhbs = require('express-handlebars');
const config = require('./config');

module.exports = exhbs.create(config.exhbs);
module.exports.attach = function(){
  
}

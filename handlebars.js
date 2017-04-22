const exhbs = require('express-handlebars');
const config = require('./config');

module.exports = exphbs.create(config.exhbs);

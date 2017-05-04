const pg = require('pg');

const client = new pg.Client('postgres://192.168.1.13');

module.exports = client;

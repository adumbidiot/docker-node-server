const pg = require('pg');

const client = new pg.Client('postgres://192.168.1.13');
client.connect(function(err){
 if(err){
   console.log(err);
 }
});

module.exports = client;

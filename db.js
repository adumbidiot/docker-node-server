const client = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.11:27017/games';

client.connect(url, function(err, db) {
  if(err) return console.error(err);
  var collection = db.collection('skeleton-sprint');
  collection.updateOne({scoreboard: 
			[
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'},
				{name: 'NONE', score: '9999.9999'}
			]});
  			db.close();
});

/*
client.connect(url, function(err, db) {
  var collection = db.collection('skeleton-sprint');
  collection.find().next(function(err, doc){
   console.log(doc.scoreboard);
   db.close();
  });
});
*/
module.exports = client;
module.exports.scoreboard = {};
module.exports.scoreboard.skeletonsprint = {};
module.exports.scoreboard.skeletonsprint.save = function(data){
  client.connect(url, function(err, db) {
    if(err){
      console.error(err);
      return;
    }
    
    var collection = db.collection('skeleton-sprint');
    collection.updateOne({scoreboard: data});
    db.close();
  });
}

module.exports.scoreboard.skeletonsprint.load = function(data){
  return new Promise(function(resolve, reject){
    client.connect(url, function(err, db) {
      if(err){
        return reject(err);
      }
    
      var collection = db.collection('skeleton-sprint');
      collection.find().next(function(err, doc){
        if(err){
          return reject(err);
        }
        
        db.close();
        return resolve(doc.scoreboard); 
      });
    });
  });
}

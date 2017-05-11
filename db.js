const client = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.11:27017/games';

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
    collection.updateOne({}, {$set: {scoreboard: data}});
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

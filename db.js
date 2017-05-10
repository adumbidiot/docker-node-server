const client = require('mongodb').MongoClient;
const url = 'mongodb://192.168.1.11:27017/games';

client.connect(url, function(err, db) {
  if(err) return console.error(err);
  var collection = db.collection('skeleton-sprint');
  collection.insertOne({scoreboard: [1, 2, 3, 4, 5]});
  db.close();
});

client.connect(url, function(err, db) {
  var collection = db.collection('skeleton-sprint');
  collection.find().next(function(err, doc){
   console.log(doc.scoreboard);
   db.close();
  });
});

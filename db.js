module.exports = function(collectionName) {
    var dbManager = {};
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var url = 'mongodb://localhost:27017/test';
    var db;

    MongoClient.connect(url, function(err, dbTemp) {
        assert.equal(null, err);
        db = dbTemp;
    });

    dbManager.insert = function(data, callback){
        db.collection(collectionName).insertOne(data, callback);
    };

    return dbManager;
}

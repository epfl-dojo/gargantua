module.exports = function(mongoUrl, collectionName) {
    var dbManager = {};
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var db;

    MongoClient.connect(mongoUrl, function(err, dbTemp) {
        assert.equal(null, err);
        db = dbTemp;
    });

    dbManager.insert = function(data, callback){
        db.collection(collectionName).insertOne(data, callback);
    };

    return dbManager;
}

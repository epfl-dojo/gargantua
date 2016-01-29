module.exports = function(collectionName) {
    var dbManager = {};
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost:27017/test';
    var db;

    MongoClient.connect(url, function(err, dbTemp) {
        assert.equal(null, err);
        db= dbTemp;
    });

    dbManager.insert = function(data, callback){
        db.collection(collectionName).insertOne(data, function(err, result){
            //assert(err, null);
            console.log("error:"+err);
            console.log("Inserted a document into " + collectionName + " collection.");
            callback(result);
        });
    };

    return dbManager;
}

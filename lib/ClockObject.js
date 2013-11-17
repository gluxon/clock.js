var MongoClient = require('mongodb').MongoClient;

function ClockObject() {}

ClockObject.prototype.setMongoDB = function(db) {
  this.db = db;
  this.collection = this.db.collection(this.collection);
};

ClockObject.prototype.getByObjectID = function(objectID, callback) {
  this.collection.findOne({_id: objectID}, callback);
};

ClockObject.prototype.getAll = function(callback) {
  this.collection.find().toArray(function(err, docs) {
    if (err) callback(err);
    else callback(null, docs);
  });
};

ClockObject.prototype.update = function(criteria, objNew, options, callback) {
  this.collection.update(criteria, objNew, options, callback);
};

module.exports = ClockObject;
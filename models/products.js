const { ObjectID, ObjectId } = require('mongodb');
const connect = require('./connection');

// { "_id" : ObjectId("5f43cbf4c45ff5104986e81d"), "name" : "Produto Silva", "quantity" : 10 }

const getAll = async () =>
  connect().then((db) => db.collection('products').find().toArray());

const add = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const findByName = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => connect()
  .then((db) => (ObjectId.isValid(id) ? db.collection('products').findOne({ _id: ObjectID(id) }) : null));

const update = async (id, name, quantity) => connect()
  .then((db) => db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } }));

const exclude = async (id) => connect()
  .then((db) => (ObjectId.isValid(id) ? db.collection('products').deleteOne({ _id: ObjectID(id) }) : null));

module.exports = { getAll, add, findByName, findById, update, exclude };

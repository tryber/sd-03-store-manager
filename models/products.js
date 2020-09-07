const connect = require('./connection');

// { "_id" : ObjectId("5f43cbf4c45ff5104986e81d"), "name" : "Produto Silva", "quantity" : 10 }

const getAll = async () =>
  connect().then((db) => db.collection('products').find().toArray());

const add = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const findByName = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => connect()
  .then((db) => db.collection('products').findOne({ _id: id }));

module.exports = { getAll, add, findByName, findById };

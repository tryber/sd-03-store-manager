const connect = require('./connection');

const getAllStore = async (database) =>
  connect().then((db) => db.collection(database).find({}).toArray());

const createProduct = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

module.exports = { getAllStore, createProduct };

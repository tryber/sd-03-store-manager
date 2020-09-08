const { ObjectId } = require('mongodb');
const connect = require('./connect');

const getAll = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) =>
  connect().then((db) => db.collection('products').findOne(ObjectId(id)));

const getProductByName = async (name) =>
  connect().then((db) => db.collection('products').findOne({ name }));

const add = (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const update = (id, name, quantity) =>
  connect()
    .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));

module.exports = {
  getAll,
  getProductById,
  getProductByName,
  add,
  update,
};

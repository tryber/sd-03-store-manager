const { ObjectId } = require('mongodb');
const connect = require('./connect');

const getAll = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) =>
  connect().then((db) => db.collection('products').findOne(ObjectId(id)));

const getProductByName = async (name) =>
  connect().then((db) => db.collection('products').findOne({ name }));

const add = (name, quantity) =>
  connect().then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = {
  getAll,
  getProductById,
  getProductByName,
  add,
};

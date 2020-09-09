const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () =>
  connect().then((db) => db.collection('sales').find().toArray());

const add = async (itensSold) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold }));

// const findByName = async (name) => connect()
//   .then((db) => db.collection('sales').findOne({ name }));

const findById = async (id) => connect()
  .then((db) => (ObjectId.isValid(id) ? db.collection('sales').findOne(ObjectId(id)) : null));

const update = async (id, itensSold) => connect()
  .then((db) => (ObjectId.isValid(id) ? db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }) : null));

const exclude = async (id) => connect()
  .then((db) => (ObjectId.isValid(id) ? db.collection('sales').deleteOne({ _id: ObjectId(id) }) : null));

module.exports = { getAll, add, findById, update, exclude };

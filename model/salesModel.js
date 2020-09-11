const connect = require('./connect');
const { ObjectId } = require('mongodb');

const insert = async (jsaleson) => connect()
  .then((db) => db.collection('sales').insertOne(jsaleson))
  .then((feeDBack) => (feeDBack.ops));

const listAll = async () => connect()
.then((db) =>
  db
  .collection('sales')
  .find({})
  .toArray(),
);

const listOne = async (id) => connect()
.then((db) =>
  db
  .collection('sales')
  .find(ObjectId(id))
  .toArray(),
);

const updateOne = async (id, saleItem) => connect()
.then((db) =>
  db
  .collection('sales')
  .updateOne(
    { _id: ObjectId(id) },
    { $set: saleItem })
  .then(() => ({ _id: id, saleItem })),
);

const erase = async (id) => connect()
.then((db) =>
  db
  .collection('sales')
  .findOneAndDelete({ _id: ObjectId(id) }))
  .then((response) => (response.value));

module.exports = {
  insert,
  listAll,
  listOne,
  updateOne,
  erase,
};

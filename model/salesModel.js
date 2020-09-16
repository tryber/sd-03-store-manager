const connect = require('./connect');
const { ObjectId } = require('mongodb');
const sales = require('../routers/salesRouter');

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
  .findOne(ObjectId(id))
);

const updateOne = async (id, saleItems) => {
  console.log('Model ', saleItems);
  return connect()
  .then((db) => db
    .collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { saleItems } })
    .then(() => ({ _id: id, saleItems }))
    .catch((err) => err),
)};

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

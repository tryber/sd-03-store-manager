const { ObjectId } = require('mongodb');
const connect = require('./connect');

const add = (itensSold) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getAll = async () =>
  connect().then((db) => db.collection('sales').find({}).toArray());

const getSaleById = async (id) =>
  connect().then((db) => db.collection('sales').findOne(ObjectId(id)));

const update = (id, itensSold) =>
  connect()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }));

const deleteById = (id) =>
  connect()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  add,
  getAll,
  getSaleById,
  update,
  deleteById,
};

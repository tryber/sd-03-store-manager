const connect = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (itensSold) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold }))
    .catch((err) => err);

const findAllSale = async () =>
  connect()
    .then((db) => db.collection('sales').find({}).toArray())
    .catch((err) => err);

const findSaleById = async (id) =>
  connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => err);

const updateSale = async (id, productId, quantity) => {
  const itensSold = [{ productId, quantity }];
  return connect()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }))
    .catch((err) => err);
};

const deleteSale = async (id) =>
  connect()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => err);

module.exports = { createSale, findAllSale, findSaleById, updateSale, deleteSale };

const { ObjectId } = require('mongodb');

const connect = require('./connection');

const getAllSales = async () => connect()
  .then((db) => db
    .collection('sales')
    .find({})
    .toArray());

const getSaleById = async (id) => connect()
  .then((db) => db
    .collection('sales')
    .findOne({ _id: ObjectId(id) }));

const createSale = async (itensSold) => connect()
  .then((db) => db
    .collection('sales')
    .insertOne({ itensSold }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    itensSold,
  }));

const updateSale = async (id, itensSold) => connect()
  .then((db) => db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
  .then(() => ({
    _id: id,
    itensSold,
  }));

const deleteSale = async (id) => connect()
  .then((db) => db
    .collection('sales')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};

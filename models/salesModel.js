// const { ObjectId } = require('mongodb');

const connect = require('./connection');

const getAllSales = async () => connect()
  .then((db) => db
    .collection('sales')
    .find({})
    .toArray());

const createSale = async (itensSold) => connect()
  .then((db) => db
    .collection('sales')
    .insertOne({ itensSold }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    itensSold,
  }));

module.exports = {
  getAllSales,
  createSale,
};

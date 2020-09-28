const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (itensSold) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getAllSales = async () => connect()
  .then((db) => db.collection('sales').find({}).toArray());

const getSaleById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)))
  .then(({ _id, productId, quantity }) => ({ _id, itensSold: [{ productId, quantity }] }));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};

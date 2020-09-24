const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (productId, quantity) => connect()
  .then((db) => db.collection('sales').insertOne({ productId, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: [{ productId, quantity }] }));

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

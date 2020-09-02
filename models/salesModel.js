const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const getAllSales = async () => connect()
  .then((db) => db
    .collection('sales')
    .find({})
    .toArray());

const createSale = async (productId, quantity) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold: { productId, quantity } }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: { productId, quantity } }));

const getSaleById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const deleteSale = async (id) => connect()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

const updateSale = async (id, { itensSold : { productId, quantity }}) => connect()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } }))
  .then(() => ({ _id: id, itensSold: { productId, quantity } }));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  deleteSale,
  updateSale,
};

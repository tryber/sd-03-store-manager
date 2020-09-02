const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (products) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: products }));

const getAllSales = async () =>
  connect()
    .then((db) => db.collection('sales').find({}).toArray())
    .then((sales) => ({ sales }));

const getSaleById = async (searchId) =>
  connect().then((db) => db.collection('sales').findOne(ObjectId(searchId)));

const updateSale = async (id, products) =>
  connect()
    .then((db) =>
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: products } }),
    )
    .then(() => ({ _id: id, itensSold: products }));

const deleteSale = async (searchId) =>
  connect().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(searchId) }));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

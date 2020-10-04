const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (itensSold) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getAllSales = async () => connect()
  .then((db) => db.collection('sales').find({}).toArray());

const getSaleById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = async (id, itensSold) => connect()
  .then((db) => db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
  .then(() => ({ _id: id, itensSold }));

const deleteSale = async (id) => connect()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const getAllSales = async () => connect()
  .then((db) => db
    .collection('sales')
    .find({})
    .toArray());

const createSale = async (name, quantity) => connect()
  .then((db) => db.collection('sales').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getSaleById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const deleteSale = async (id) => connect()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

const updateSale = async (id, { name, quantity }) => connect()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(() => ({ _id: id, name, quantity }));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  deleteSale,
  updateSale,
};

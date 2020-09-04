const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerSales = async (productId, quantity) => connect()
  .then((db) => db.collection('sales').insertOne({ productId, quantity }))
  .then(({ insertedId }) => ({ id: insertedId, productId, quantity }));

const getSales = async () => connect()
  .then((db) => db.collection('sales').find({}).toArray());

const getSalesById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSalesInBank = async (id, quantity) => connect()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { id, quantity } }))
  .then(({ insertedId }) => ({ insertedId, quantity }));

module.exports = {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
};

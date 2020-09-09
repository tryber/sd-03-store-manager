const { connect } = require('./connection');
const { ObjectId } = require('mongodb');

const saleCreate = async (products) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: products }));

const SaleList = async () =>
  connect()
    .then((db) => db.collection('sales').find({}).toArray())
    .then((sales) => ({ sales }));

const SaleUpdate = async (id, products) =>
  connect()
    .then((db) =>
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: products } }),
    )
    .then(() => ({ _id: id, itensSold: products }));

module.exports = {
  saleCreate,
  SaleList,
  SaleUpdate,
};

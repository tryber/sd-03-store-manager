const { connect } = require('./connection');

const saleCreate = async (products) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: products }));

const SaleList = async () =>
  connect()
    .then((db) => db.collection('sales').find({}).toArray())
    .then((sales) => ({ sales }));

module.exports = {
  saleCreate,
  SaleList,
};

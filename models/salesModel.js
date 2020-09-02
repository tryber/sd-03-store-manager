const { ObjectId } = require('mongodb');
const { connect } = require('./connect');

const createSale = async (products) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: products }));

module.exports = {
  createSale,
};

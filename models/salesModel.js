// const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (productId, quantity) => connect()
  .then((db) => db.collection('sales').insertOne({ productId, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: [{ productId, quantity }] }));

module.exports = {
  createSale,
};

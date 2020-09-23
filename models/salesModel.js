// const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createSale = async (itensSold) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

module.exports = {
  createSale,
};

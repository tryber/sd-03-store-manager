const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const insertSales = async (sales) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: sales }));

module.exports = {
  insertSales,
};

// const ObjectId = require('mongodb').ObjectID;
const connect = require('./connection');

const registerSales = (sales) =>
  connect()
    .then((db) => db.collection('sales').insertMany(sales))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: sales }));

module.exports = {
  registerSales,
};

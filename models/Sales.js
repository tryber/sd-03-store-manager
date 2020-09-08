const { connect } = require('./connection');

const saleCreate = async (products) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: products }));

module.exports = {
  saleCreate,
};

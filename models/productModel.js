const { connect } = require('./connection');

const createProduct = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

module.exports = {
  createProduct,
};

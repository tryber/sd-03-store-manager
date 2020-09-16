const connect = require('./connection');

const getAllProducts = async () => connect()
  .then((db) => db
    .collection('products')
    .find({})
    .toArray());

module.exports = {
  getAllProducts,
};

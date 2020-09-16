const connect = require('./connection');

const getAllProducts = async () => connect()
  .then((db) => db
    .collection('products')
    .find({})
    .toArray());

const createProduct = async (name, quantity) => connect()
  .then((db) => db
    .collection('products')
    .insertOne({ name, quantity }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    name,
    quantity,
  }));

const getProductByName = async (name) => connect()
  .then((db) => db
    .collection('products')
    .find({ 'name': name })
    .toArray());

module.exports = {
  getAllProducts,
  createProduct,
  getProductByName,
};

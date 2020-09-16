const connect = require('./connection');

const getAllProducts = async () => connect()
  .then((db) => db
    .collection('products')
    .find({})
    .toArray());

const createProduct = async (name, quatity) => connect()
  .then((db) => db
    .collection('products')
    .insertOne({ name, quatity }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    name,
    quatity,
  }));

const getProductByName = async (name) => connect()
  .then((db) => db
    .collection('products')
    .find({"name": name})
    .toArray());

module.exports = {
  getAllProducts,
  createProduct,
  getProductByName,
};

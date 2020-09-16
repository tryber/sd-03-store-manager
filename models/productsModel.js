const { ObjectId } = require('mongodb');

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

const getProductByName = async (productName) => connect()
  .then((db) => db
    .collection('products')
    .find({ name: productName })
    .toArray());

const getProductById = async (productId) => connect()
  .then((db) => db
    .collection('products')
    .find({ _id: ObjectId(productId) })
    .toArray());

module.exports = {
  getAllProducts,
  createProduct,
  getProductByName,
  getProductById,
};

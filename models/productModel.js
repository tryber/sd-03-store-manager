const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => (
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
);

const getProductByEq = async (name) => (
  connection()
    .then((db) => db.collection('products').findOne({ name: { $eq: name } }))
);

module.exports = {
  createProduct,
  getProductByEq,
};

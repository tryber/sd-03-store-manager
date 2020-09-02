const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => (
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
);

module.exports = {
  createProduct,
};

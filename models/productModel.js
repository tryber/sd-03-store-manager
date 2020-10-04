const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createProduct = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getProductByName = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }));

const getAllProducts = async () => connect()
  .then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) => connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProduct = async (id, { name, quantity }) => connect()
  .then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(() => ({ _id: id, name, quantity }));

const deleteProduct = async (id) => connect()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

const incrementQuantity = async (id, quantity) => connect()
  .then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $inc: { quantity } }));
// $inc method based on Ilan PR.

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  incrementQuantity,
};

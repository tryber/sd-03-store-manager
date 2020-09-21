// MODEL: Recebe dados tratados do service e interage com o banco de dados!
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const removeProduct = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
  .then((prod) => ({ ...prod }));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductsById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const getProductsByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const updateProduct = async (id, name, quantity) => connection()
  .then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

module.exports = {
  createProduct,
  removeProduct,
  getAllProducts,
  getProductsById,
  getProductsByName,
  updateProduct,
};

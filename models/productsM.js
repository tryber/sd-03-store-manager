// MODEL: Recebe dados tratados do service e interage com o banco de dados!
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductsById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const getProductsByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const createProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByName,
  createProduct,
};

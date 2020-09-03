const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Criar um produto novo
const createProduct = async (name, quantity) => (
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
);

// Localizar produto pelo nome
const getProductByEq = async (name) => (
  connection()
    .then((db) => db.collection('products').findOne({ name: { $eq: name } }))
);

// Retornar todos os produtos
const getAllProducts = async () => (
  connection()
    .then((db) => db.collection('products').find({}).toArray())
);

// Retornar produto que de 'match' com o id
const getProductById = async (id) => (
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
);

module.exports = {
  createProduct,
  getProductByEq,
  getAllProducts,
  getProductById,
};

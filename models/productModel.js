const { ObjectId } = require('mongodb');

const connection = require('./connection');

// Criar um produto novo
const createProduct = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

// Localizar produto pelo nome
const getProductByEq = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name: { $eq: name } }));

// Retornar todos os produtos
const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

// Retornar produto que de 'match' com o id
const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectId(id)));

// Atualizar produto localizado pelo Id
const updateProductById = async (id, { name, quantity }) =>
  connection()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));

// Deletar um produtos
const deleteProductById = async (id) =>
  connection().then((db) =>
    db
      .collection('products')
      .findOneAndDelete({ _id: ObjectId(id) }));

module.exports = {
  createProduct,
  getProductByEq,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};

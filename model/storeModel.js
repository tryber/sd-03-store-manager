const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = () => connection()
  .then((db) => db.collection('products').find({}).toArray());

const createProduct = (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const findByName = (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }));

const getProductById = (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProduct = (id, { name, quantity }) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(() => ({ id, name, quantity }));

const deleteProduct = (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

const createSale = (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getAllSales = () => connection()
  .then((db) => db.collection('sales').find({}).toArray());

const getSaleById = (id) =>
  connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = (_id, itensSold) => connection()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(_id) }, { $set: { itensSold } }))
  .then(() => ({ _id, itensSold }));

const deleteSale = (id) => connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createProduct,
  getAllProducts,
  findByName,
  getProductById,
  updateProduct,
  deleteProduct,
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

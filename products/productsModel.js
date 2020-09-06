const { ObjectID } = require('mongodb');
const connection = require('../models/connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectID(id)));

const addProduct = async (name, quantity) => {
  const db = await connection();
  return db.collection('products').insertOne({ name, quantity });
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  return db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
};

const updateStock = async (id, quantity) => {
  const db = await connection();
  return db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { quantity } });
};

const deleteProduct = async (id) => {
  const db = await connection();
  const { value } = await db.collection('products').findOneAndDelete({ _id: ObjectID(id) });
  return value;
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
};

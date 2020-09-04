const { ObjectId } = require('mongodb');
const connect = require('./connect.js');

const insertProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products')
    .insertOne({ name, quantity });
  return product;
};

const getProductByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products')
    .findOne({ name });

  return product;
};

const getProductById = async (id) => {
  const db = await connect();
  const product = await db.collection('products')
    .findOne(ObjectId(id));

  return product;
};

const getAllProducts = async () => {
  const db = await connect();
  const products = await db.collection('products')
    .find({}).toArray();

  return products;
};

module.exports = {
  insertProduct,
  getProductByName,
  getAllProducts,
  getProductById,
};

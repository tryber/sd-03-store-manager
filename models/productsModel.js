const { ObjectId } = require('mongodb');
const connect = require('./connect');

const getAllProducts = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  const response = { products };
  return response;
};

const getProductByName = async (query) => {
  const db = await connect();
  return db.collection('products').findOne({ name: query });
};

const getProductById = async (productId) => {
  const db = await connect();
  const product = await db.collection('products').findOne(ObjectId(productId));
  return product;
};

const addProduct = async (name, quantity) => {
  const db = await connect();
  let product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = product;
  product = { _id: insertedId, name, quantity };
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connect();
  const coll = db.collection('products');
  let product = await coll.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  product = { _id: id, name, quantity };
  return product;
};

const deleteProduct = async (id) => {
  const db = await connect();
  const deletedProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return deletedProduct;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
};

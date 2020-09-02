const connect = require('./connect');

const getAllProducts = async () => {
  const db = await connect();
  return db.collection('products').find().toArray();
};

const getProductByName = async (query) => {
  const db = await connect();
  return db.collection('products').findOne({ name: query });
};

const getProductById = async (productId) => {
  const db = await connect();
  return db.collection('products').findOne({ id: productId });
};

const add = async (name, quantity) => {
  const db = await connect();
  return db.collection('products').insertOne({ name, quantity });
};

module.exports = {
  add,
  getAllProducts,
  getProductByName,
  getProductById,
};

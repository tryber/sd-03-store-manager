const connect = require('./connect');

const getAllProducts = async () => {
  const db = await connect();
  return db.collection('products').find({}).toArray();
};

const getProductByName = async (query) => {
  const db = await connect();
  return db.collection('products').findOne({ name: query });
};

const getProductById = async (productId) => {
  const db = await connect();
  return db.collection('products').findOne({ id: productId });
};

const addProduct = async (name, quantity) => {
  const db = await connect();
  let product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = product;
  product = { _id: insertedId, name, quantity };
  return product;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductByName,
  getProductById,
};

const connect = require('./connect.js');

const insertProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products')
    .insertOne({ name, quantity });
  return product;
};

const getProductByName = async (name) => {
  const db = await connect();
  const productName = await db.collection('products')
    .findOne({ name });

  if (!productName) return false;

  return true;
};

module.exports = {
  insertProduct,
  getProductByName,
};

const { ObjectId } = require('mongodb');
const connect = require('./connect.js');

const insertProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product;
};

const getProductByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });

  return product;
};

const getProductById = async (id) => {
  const db = await connect();
  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const getAllProducts = async () => {
  const db = await connect();
  const products = await db.collection('products').find({}).toArray();

  return products;
};

const updateProductById = async (id, name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    {
      $set: { name, quantity },
    },
  );

  return product;
};

const updateProductStock = async (id, soldQuantity, operator) => {
  const db = await connect();
  const product = await db.collection('products')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $inc: { quantity: parseInt(operator + soldQuantity, 10) } },
      { returnOriginal: false },
    );

  return product.value;
};

const deleteProductsById = async (id) => {
  const db = await connect();
  const product = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });

  if (!product.value) return false;

  return product.value;
};

module.exports = {
  insertProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductsById,
  updateProductStock,
};

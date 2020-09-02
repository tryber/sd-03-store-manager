// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProducts = async (name, quantity) => {
  try {
    const db = await connection();
    const register = await db.collection('products').insertOne({ name, quantity });
    const response = register.insertedId
      ? { _id: register.insertedId, name, quantity }
      : new Error('register error');

    return response;
  } catch (error) {
    throw new Error('product register failed');
  }
};

const getProductByName = async (name) => {
  console.log(name);
  try {
    const db = await connection();
    const searchQuery = await db.collection('products').findOne({ name });
    return searchQuery;
  } catch (error) {
    throw new Error('product search failed');
  }
};

module.exports = { createProducts, getProductByName };

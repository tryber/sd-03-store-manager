const { ObjectId } = require('mongodb');
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

const getAllProducts = async () => {
  try {
    const db = await connection();
    const searchAll = await db.collection('products').find().toArray();
    return searchAll;
  } catch (error) {
    throw new Error('product search failed');
  }
};

const getProductByName = async (name) => {
  try {
    const db = await connection();
    const searchQuery = await db.collection('products').findOne({ name });
    return searchQuery;
  } catch (error) {
    throw new Error('product search failed');
  }
};

const getProductById = async (id) => {
  try {
    const db = await connection();
    const searchQuery = await db.collection('products').findOne(ObjectId(id));
    return searchQuery;
  } catch (error) {
    throw new Error('Wrong id format');
  }
};

module.exports = { createProducts, getAllProducts, getProductByName, getProductById };

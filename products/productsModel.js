const { ObjectID } = require('mongodb');
const connection = require('../models/connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectID(id)));

const add = async (name, quantity) => {
  const db = await connection();
  return db.collection('products').insertOne({ name, quantity });
};

module.exports = {
  getAllProducts,
  add,
  getProductById,
};

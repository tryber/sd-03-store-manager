const connection = require('../models/connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const add = async (name, quantity) => {
  const db = await connection();
  return db.collection('products').insertOne({ name, quantity });
};

module.exports = {
  getAllProducts,
  add,
};

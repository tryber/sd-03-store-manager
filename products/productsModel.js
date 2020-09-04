const connection = require('../models/connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

module.exports = {
  getAllProducts,
};

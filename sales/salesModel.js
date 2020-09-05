// const { ObjectID } = require('mongodb');
const connection = require('../models/connection');

const addSale = async (itensSold) => {
  const db = await connection();
  return db.collection('sales').insertOne({ itensSold });
};

module.exports = { addSale };

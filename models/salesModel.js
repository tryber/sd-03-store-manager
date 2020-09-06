const { ObjectId } = require('mongodb');
const connect = require('./connect');

const addSale = async (soldItensArray) => {
  const db = await connect();
  let newSale = await db.collection('sales').insertOne({ itensSold: soldItensArray });
  const { insertedId } = newSale;
  newSale = { _id: insertedId, itensSold: soldItensArray };
  return newSale;
};

const getAllSales = async () => {
  const db = await connect();
  let sales = await db.collection('sales').find().toArray();
  sales = { sales };
  return sales;
};

const getSaleById = async (id) => {
  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};

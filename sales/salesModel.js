const { ObjectID } = require('mongodb');
const connection = require('../models/connection');

const addSale = async (itensSold) => {
  const db = await connection();
  return db.collection('sales').insertOne({ itensSold });
};

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find({}).toArray());

const getSalesById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectID(id)));

const updateSales = async (id, itensSold) => {
  const db = await connection();
  return db.collection('sales').updateOne({ _id: ObjectID(id) }, { $set: { itensSold } });
};

const deleteSales = async (id) => {
  const db = await connection();
  const { value } = await db.collection('sales').findOneAndDelete({ _id: ObjectID(id) });
  return value;
};

module.exports = { addSale, getAllSales, getSalesById, updateSales, deleteSales };

const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const insertSales = async (sales) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: sales }));

const getAllSales = async () =>
  connect()
    .then((db) => db.collection('sales').find({})
      .toArray());

const getSalesById = async (id) =>
  connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
};

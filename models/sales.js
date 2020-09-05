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

const updateSales = async (id, values) =>
  connect()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: values } }))
    .then(() => ({ _id: id, itensSold: values }));

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  updateSales,
};

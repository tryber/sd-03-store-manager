const { ObjectId } = require('mongodb');

const { connect } = require('./connect');

const getAllSales = async () => connect()
  .then(db => db
    .collection('sales')
    .find({})
    .toArray(),
);

const createSale = async (itensSold) => (
  connect()
    .then((db) => (
      db.collection('sales').insertOne({ itensSold }))))
      .then(({ insertedId }) => ({ _id: insertedId, itensSold })
);

const updateSale = async (id, itensSold) => (
  connect()
    .then((db) => (
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } })))
      .then(() => ({ _id: id, itensSold }))
);

const getSaleById = async (id) => (
  connect()
    .then((db) => (
      db.collection('sales').findOne(ObjectId(id))))
);

const deleteSale = async (id) => (
  connect()
    .then((db) => (
      db.collection('sales').deleteOne({ _id: ObjectId(id) })))
);

module.exports = {
  getAllSales,
  createSale,
  updateSale,
  deleteSale,
  getSaleById,
};

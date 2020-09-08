const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerSales = async (products) => connect()
  .then((db) => db.collection('sales').insertOne({ itensSold: [...products] }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...products] }));

const getSales = async () => connect()
  .then((db) =>
    db.collection('sales')
      .find({})
      .toArray());

const getSalesById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)))
  .catch((error) => error);

const updateSalesInBank = async (id, productId, quantity) => {
  const itensSold = [{ productId, quantity }];
  return connect()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }))
    .catch((err) => err);
};

const deleteSaleBank = async (id) => {
  const db = await connect();
  db.collection('sales').findOneAndDelete({ _id: ObjectId(id) })
    .then(({ value }) => value)
    .catch((error) => error);
};

module.exports = {
  registerSales,
  getSales,
  getSalesById,
  updateSalesInBank,
  deleteSaleBank,
};

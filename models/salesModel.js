const ObjectId = require('mongodb').ObjectID;
const connect = require('./connection');

const registerSales = (sales) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: sales }));

const getSaleById = async (id) =>
  connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getAllSales = async () =>
  connect()
    .then((db) => db.collection('sales').find({}).toArray())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const updateSale = async (id, { productId, quantity }) =>
  connect()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: id },
        { $set: { 'itensSold.$[id].productId': productId, 'itensSold.$[qtd].quantity': quantity } },
        {
          arrayFilters: [{ 'id.productId': productId }, { 'qtd.quantity': quantity }],
        },
      ))
    .then(() => ({ _id: id, itensSold: [{ productId, quantity }] }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  registerSales,
  getSaleById,
  getAllSales,
  updateSale,
};

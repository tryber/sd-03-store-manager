// MODEL: Recebe dados tratados do service e interage com o banco de dados!
// esse codigo n teria sido feito sem ajuda do hebert, obg amigo!
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (sales) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: [...sales] }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...sales] }));

const deleteSale = async (saleId) => connection()
  .then((db) => db.collection('sales').findOneAndDelete(
    {
      _id: ObjectId(saleId),
    },
    { returnOriginal: true },
  ));

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSalesById = async (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = async (saleId, prod) => connection()
  .then((db) => db.collection('sales').findOneAndUpdate(
    {
      _id: ObjectId(saleId),
      'itensSold.productId': prod.productId,
    },
    { $set: { 'itensSold.$[].quantity': prod.quantity } },
    { returnOriginal: false },
  ));

module.exports = {
  createSale,
  deleteSale,
  getAllSales,
  getSalesById,
  updateSale,
};

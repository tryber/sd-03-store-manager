const { ObjectId } = require('mongodb');

const connection = require('./connection');

// Criar uma nova venda
const createSale = async (arrProd) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...arrProd] }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...arrProd] }));

// Lista todas as vendas
const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find({}).toArray());

// Lista venda por IdsCad
const getSaleById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

// Atualiza uma venda
// const updateSale = async (idSale, prodId, prodQtd) =>
//   connection().then((db) =>
//     db
//       .collection('sales')
//       .findOneAndUpdate(
//         { _id: ObjectId(idSale), 'itensSold.productId': prodId },
//         { $set: { 'itensSold.$[].quantity': prodQtd } },
//         { returnOriginal: false },
//       ));

// Deleta uma venda
const deleteById = async (id) =>
  connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  // updateSale,
  deleteById,
};

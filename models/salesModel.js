const connection = require('./connection');

const { ObjectId } = require('mongodb');

// Criar uma nova venda
const createSale = async (arrProd) => (
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...arrProd] }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...arrProd] }))
);

// Lista todas as vendas
const getAllSales = async () => (
  connection()
    .then((db) => db.collection('sales').find({}).toArray())
);

// Lista venda por IdsCad
const getSaleById = async (id) => (
  connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
);

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};

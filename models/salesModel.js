const { ObjectId } = require('mongodb');
const connect = require('./connect');

// [
//   {
//     "productId": "5f523961a3d4d652fbd31731",
//     "quantity": 2
//   },
//   {
//     "productId": "5f52753388628941c9be3feb",
//     "quantity": 1
//   }
// ]

const insertSales = async (itensSold) => {
  // console.log(itensSold)
  const db = await connect();
  const sales = await db.collection('sales').insertOne({
    itensSold,
  });

  return sales.ops;
};

const getCollectionDb = async (name) => {
  const db = await connect();
  const collection = await db.collection(name).find({}).toArray();
  return collection;
};

const getSpecificSale = async (id) => {
  const db = await connect();
  const sale = await db.collection('sales')
    .findOne({ _id: ObjectId(id) });

  return sale;
};

const updateSale = async (id, itensSold) => {
  const db = await connect();
  const updatedSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
      { returnOriginal: false },
    );

  return updatedSale.value;
};

const deleteSale = async (id) => {
  const db = await connect();
  const saleDeleted = await db.collection('sales')
    .findOneAndDelete(
      { _id: ObjectId(id) },
      { returnOriginal: true },
    );
  return saleDeleted.value;
};

module.exports = {
  insertSales,
  getCollectionDb,
  getSpecificSale,
  updateSale,
  deleteSale,
};

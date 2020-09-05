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
  const db = await connect();
  const sales = await db.collection('sales')
    .insertOne(
      {
        itensSold,
      },
    );

  return sales.ops;
};

const getCollectionDb = async (name) => {
  const db = await connect();
  const collection = await db.collection(name)
    .find({}).toArray();
  return collection;
};

module.exports = {
  insertSales,
  getCollectionDb,
};

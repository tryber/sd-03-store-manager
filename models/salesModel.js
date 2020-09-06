const connect = require('./connect');

const addSale = async (soldItensArray) => {
  const db = await connect();
  let newSale = await db.collection('sales').insertOne({ itensSold: soldItensArray });
  const { insertedId } = newSale;
  newSale = { _id: insertedId, itensSold: soldItensArray };
  return newSale;
};

module.exports = {
  addSale,
};

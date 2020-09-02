const { connectTo } = require('./connect');
const { ObjectID } = require('mongodb');


async function createSale(products) {
  const salesColl = await connectTo('sales');
  return salesColl.insertOne({ itensSold: products });
}


async function getAll() {
  const salesColl = await connectTo('sales');
  return salesColl.find().toArray();
}

async function getById(id) {
  const salesColl = await connectTo('sales');
  return salesColl.findOne(ObjectID(id));
}

module.exports = {
  createSale,
  getAll,
  getById,
};

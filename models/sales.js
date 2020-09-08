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

async function updateById(id, productId, { quantity }) {
  const salesColl = await connectTo('sales');
  return salesColl.updateOne(
    { _id: ObjectID(id) },
    { $set: { 'itensSold.$[matchProductId].quantity': quantity } },
    { arrayFilters: [{ 'matchProductId.productId': productId }] },
  );
}

async function deleteSaleById(id) {
  const salesColl = await connectTo('sales');
  return salesColl.deleteOne({ _id: ObjectID(id) });
}

module.exports = {
  createSale,
  getAll,
  getById,
  updateById,
  deleteSaleById,
};

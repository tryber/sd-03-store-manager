const { connectTo } = require('./connect');
const { ObjectID } = require('mongodb');

async function add(name, quantity) {
  const productsColl = await connectTo('products');
  return  productsColl.insertOne({ name, quantity });
}

async function getAll() {
  const productsColl = await connectTo('products');
  return productsColl.find().toArray();
}

async function getByName(name) {
  const productsColl = await connectTo('products');
  return productsColl.findOne({ name });
}

async function getById(id) {
  const productsColl = await connectTo('products');
  return productsColl.findOne(ObjectID(id));
}

async function updateById(id, { name, quantity }) {
  console.log('params', id, name, quantity)
  const productsColl = await connectTo('products');
  return productsColl.updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
}

module.exports = {
  add,
  getAll,
  getByName,
  getById,
  updateById,
};

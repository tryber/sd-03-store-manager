const { connectTo } = require('./connect');
const { ObjectID } = require('mongodb');

async function add(name, quantity) {
  const productsColl = await connectTo('products');
  return productsColl.insertOne({ name, quantity });
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

async function getAllById(ids) {
  const productsColl = connectTo('products');
  return productsColl.find({ _id: { $in: ids.map((id) => ObjectID(id)) } }).toArray();
}

async function updateById(id, { name, quantity }) {
  const productsColl = await connectTo('products');
  return productsColl.updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
}

async function deleteById(id) {
  const productsColl = await connectTo('products');
  await productsColl.deleteOne({ _id: ObjectID(id) });
}

module.exports = {
  add,
  getAll,
  getAllById,
  getByName,
  getById,
  updateById,
  deleteById,
};

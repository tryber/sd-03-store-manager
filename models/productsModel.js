const { connect } = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) => {
  const db = await connect();

  const { insertedId } = await db.collection('products').insertOne({ name, quantity });

  return { _id: insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();

  const product = await db.collection('products').findOne({ name });

  return product;
};

const listAll = async () => {
  const db = await connect();

  const products = await db.collection('products').find({}).toArray();

  return { products };
};

const findById = async (id) => {
  const db = await connect();

  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const updateById = async (id, name, quantity) => {
  const db = await connect();

  await db.collection('products').findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: id, name, quantity };
};

const removeById = async (id) => {
  const db = await connect();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  add,
  findByName,
  listAll,
  findById,
  updateById,
  removeById,
};

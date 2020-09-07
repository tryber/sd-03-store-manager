const { connect } = require('./connect');
const { ObjectId }= require('mongodb');

const add = async (itensSold) => {
  const db = await connect();

  const { insertedId } = await db.collection('sales').insertOne({ itensSold });

  return { _id: insertedId, itensSold};
};

const listAll = async () => {
  const db = await connect();

  const sales = await db.collection('sales').find({}).toArray();

  return { sales };
};

const findById = async (id) => {
  const db = await connect();

  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
};

const updateById = async (id, itensSold) => {
  const db = await connect();

  await db.collection('sales').findOneAndUpdate({ _id: ObjectId(id)}, { $set: { itensSold }});
  
  return { _id: id, itensSold };
};

const removeById = async (id) => {
  const db = await connect();
  await db.collection('sales').deleteOne({ _id: ObjectId(id)});
}

module.exports = {
  add,
  listAll,
  findById,
  updateById,
  removeById,
}
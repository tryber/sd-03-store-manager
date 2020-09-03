const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createCollectionProducts = async (name, quantity) => {
  const db = await connect();
  db.collection('products').insertOne({ name, quantity })
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));
};

const listAllProducts = async () => connect()
  .then((db) => db.collection('products').find({}).toArray());

const listProductsById = async (id) => connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProductsByIdBank = async (id, name, quantity) => connect()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
    .then(() => ({ _id: id, name, quantity })));

const deleteProductsByIdBank = async (id) => connect()
  .then((db) => db.collection('products').deleteOne(ObjectId(id)));

module.exports = {
  createCollectionProducts,
  listAllProducts,
  listProductsById,
  updateProductsByIdBank,
  deleteProductsByIdBank,
};

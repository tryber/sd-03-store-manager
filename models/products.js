const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createCollectionProducts = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const verifyNameExit = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }), { name: 1, _id: 0 });

const listAllProducts = async () => connect()
  .then((db) => db.collection('products').find({}).toArray());

const listProductsById = async (id) => connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProductsByIdBank = async (id, name, quantity) => connect()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } })
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity })));

const deleteProductsByIdBank = async (id, name, quantity) => connect()
  .then((db) => db.collection('products').deleteOne({ id, name, quantity }));

module.exports = {
  createCollectionProducts,
  verifyNameExit,
  listAllProducts,
  listProductsById,
  updateProductsByIdBank,
  deleteProductsByIdBank,
};

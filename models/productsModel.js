const connect = require('./connection');
const { ObjectId } = require('mongodb');

const getAllStore = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

const findProductById = async (id) =>
  connect().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

const createProduct = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const findByNameProduct = async (name) =>
  connect().then((db) => db.collection('products').findOne({ name }, { name: 1, _id: 0 }));

const updateProduct = async (id, name, quantity) =>
  connect().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
      .then(({ insertedId }) => ({ _id: insertedId, name, quantity })),
  );

const deleteProduct = async (id) =>
  connect().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }, 'products'));

module.exports = {
  getAllStore,
  createProduct,
  findByNameProduct,
  findProductById,
  updateProduct,
  deleteProduct,
};

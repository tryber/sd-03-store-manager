const { ObjectId } = require('mongodb');
const mongoc = require('./connection');

const createProductInDB = async (name, quantity) =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getAllProducts = async () =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .find({})
    .toArray(),
  );

const getProductByName = async (name) =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .findOne({ name }),
  );

const getProductById = async (id) => mongoc.connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)))
  .catch((error) => error);

const updateProductById = async (id, name, quantity) => mongoc.connect()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then (() => ({ _id: id, name, quantity }))
  .catch((error) => error);

const deleteProductById = async (id, name, quantity) => mongoc.connect()
  .then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }))
  .then (() => ({ _id: id, name, quantity }))
  .catch((error) => error);

  module.exports = {
  getProductByName,
  createProductInDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};

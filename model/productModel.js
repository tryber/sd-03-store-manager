const { ObjectId } = require('mongodb');
const mongoc = require('./connection');

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

const createProductInDB = async (name, quantity) =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getProductById = async (id) => mongoc.connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)))
  .catch((error) => error);

module.exports = {
  getProductByName,
  createProductInDB,
  getAllProducts,
  getProductById,
};

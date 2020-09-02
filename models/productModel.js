const ObjectId = require('mongodb').ObjectID;
const connect = require('./connection');

const findProductByName = async (name) =>
  connect()
    .then((db) => db.collection('products').findOne({ name }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getProductById = async (id) => {
  console.log('id', id, ObjectId(id));
  return connect()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const getAllProducts = async () => {
  console.log('get all');
  return connect()
    .then((db) => db.collection('products').find({}).toArray())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const createProduct = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  createProduct,
  findProductByName,
  getProductById,
  getAllProducts,
};

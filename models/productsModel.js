const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createProduct = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getProductByName = async (searchName) =>
  connect().then((db) => db.collection('products').findOne({ name: searchName }));

const getAllProducts = async () =>
  connect()
    .then((db) => db.collection('products').find({}).toArray())
    .then((products) => ({ products }));

const getProductById = async (searchId) =>
  connect().then((db) => db.collection('products').findOne(ObjectId(searchId)));

const updateProduct = async (id, name, quantity) =>
  connect()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
    )
    .then(() => ({ _id: id, name, quantity }));

const updateQuantity = async (id, soldQuantity) =>
  connect().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $inc: { quantity: soldQuantity } }),
  );

const deleteProduct = async (id) =>
  connect()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then((deleted) => deleted);

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateQuantity,
  updateProduct,
  deleteProduct,
};

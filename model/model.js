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
  .then(() => ({ _id: id, name, quantity }))
  .catch((error) => error);

const deleteProductById = async (id, name, quantity) => mongoc.connect()
  .then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }))
  .then(() => ({ _id: id, name, quantity }))
  .catch((error) => error);

const createSaletInDB = async (products) =>
  mongoc.connect()
  .then((db) => db
    .collection('sales')
    .insertOne({ itensSold: [...products] }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: [...products] }));

const getAllSales = async () =>
  mongoc.connect()
    .then((db) => db
      .collection('sales')
      .find({})
      .toArray(),
    );

const getSaleById = async (id) => mongoc.connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)))
  .catch((error) => error);

const updateSaleById = async (id, productId, quantity) => {
  const itensSold = [{ productId, quantity }];
  return mongoc.connect()
  .then((db) => db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
  ))
  .then(() => ({ _id: id, itensSold }));
};

module.exports = {
  getProductByName,
  createProductInDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createSaletInDB,
  getAllSales,
  getSaleById,
  updateSaleById,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const byId = async (id, database) => {
  const teste = await connection()
    .then((db) => db.collection(database).findOne(ObjectId(id)));
  return teste;
};

const getAll = (database) => connection()
  .then((db) => db.collection(database).find({}).toArray());

const deleteOne = (id, database) => connection()
  .then((db) => db.collection(database).deleteOne({ _id: ObjectId(id) }));

const getAllProducts = () => getAll('products');

const createProduct = (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const findByName = (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }));

const getProductById = (id) => byId(id, 'products');

const updateProduct = (id, { name, quantity }) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(() => ({ id, name, quantity }));

const deleteProduct = (id) => deleteOne(id, 'products');

const createSale = (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getAllSales = () => getAll('sales');

const getSaleById = async (id) => byId(id, 'sales');

const deleteSale = (id) => deleteOne(id, 'sales');

const update = (productId, type, value, acc) =>
  connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(productId) }, { [acc]: { [type]: value } }));

const updateProductAfterSale = (soldItems) => {
  soldItems.forEach(({ productId, quantity }) => update(productId, 'quantity', -quantity, '$inc'));
};

const updateProductAfterDeletion = ({ itensSold }) => {
  itensSold.forEach(({ productId, quantity }) => update(productId, 'quantity', quantity, '$inc'));
};

const updateSale = (_id, itensSold) => update(_id, 'itensSold', itensSold, '$set')
  .then(() => ({ _id, itensSold }));

module.exports = {
  createProduct,
  getAllProducts,
  findByName,
  getProductById,
  updateProduct,
  deleteProduct,
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  updateProductAfterDeletion,
  updateProductAfterSale,
};

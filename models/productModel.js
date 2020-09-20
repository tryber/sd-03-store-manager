const { connect } = require('./connection');

const createProduct = async (name, quantity) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getProductByName = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }));

// const getAllProducts = async () => connect()
//   .then((db) => db.collection('products').find({}).toArray());

// const getProductById = async (id) => connect()
// .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = {
  createProduct,
  getProductByName,
  // getAllProducts,
  // getProductById,
};

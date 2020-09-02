// const { ObjectId } = require('mongodb');

// const { connect } = require('./connection');

// const getAllProducts = async () => connect()
//   .then((db) => db
//     .collection('products')
//     .find({})
//     .toArray());

// const createProduct = async (name, quantity) => connect()
//   .then((db) => db.collection('products').insertOne({ name, quantity }))
//   .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

// const getProductById = async (id) => connect()
//   .then((db) => db.collection('products').findOne(ObjectId(id)));

// const deleteProduct = async (id) => connect()
//   .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

// const updateProduct = async (id, { name, quantity }) => connect()
//   .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
//   .then(() => ({ _id: id, name, quantity }));

// module.exports = {
//   getAllProducts,
//   createProduct,
//   getProductById,
//   deleteProduct,
//   updateProduct,
// };

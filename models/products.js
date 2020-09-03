const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createCollectionProducts = async (name, quantity) => {
  const db = await connect();
  db.collection('products').insertOne({ name, quantity })
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));
};

// const listAllProducts = async () => {
//   const db = await connect();
//   db.collection('products').find({}).toArray();
// };

const listAllProducts = async () => connect()
  .then((db) => db.collection('products').find({}).toArray());

const listProductsById = async (id) => connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = { listAllProducts, listProductsById, createCollectionProducts };

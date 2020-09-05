const { connect } = require('./connection');

const ProductCreate = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const ProductAll = async () =>
  connect()
    .then((db) => db.collection('products').find({}).toArray())
    .then((products) => ({ products }));
  
module.exports = {
  ProductCreate,
  ProductAll,
}
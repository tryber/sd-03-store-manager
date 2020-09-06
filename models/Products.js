const { connect } = require('./connection');
const { ObjectId } = require('mongodb');

const ProductCreate = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const ProductAll = async () =>
  connect()
    .then((db) => db.collection('products').find({}).toArray())
    .then((products) => ({ products }));

const ProductByName = async (nameQuery) =>
  connect().then((db) => db.collection('products').findOne({ name: nameQuery }));

const ProductById = async (id) =>
  connect().then((db) => db.collection('products').findOne(ObjectId(id)));

const ProductUpdate = async (id, name, quantity) =>
  connect()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
    )
    .then(() => ({ _id: id, name, quantity }));  

module.exports = {
  ProductCreate,
  ProductAll,
  ProductByName,
  ProductById,
  ProductUpdate,
};

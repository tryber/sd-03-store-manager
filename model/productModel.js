const connect = require('./connect');
const { ObjectId } = require('mongodb');

const listAll = async () => connect()
  .then((db) =>
    db
    .collection('products')
    .find({})
    .toArray(),
  );

const selectById = async (id) => connect()
  .then((db) =>
    db
    .collection('products')
    .find(ObjectId(id))
    .toArray(),
  );

const selectByName = async (name) => connect()
  .then((db) =>
    db
    .collection('products')
    .find({ 'name': name })
    .toArray(),
  );

const create = async (name, quantity) => connect()
.then((db) =>
  db
  .collection('products')
  .insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const update = async (id, name, quantity) => connect()
.then((db) =>
  db
  .collection('products')
  .updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }))
  .then(() => ({ _id: id, name, quantity }));

const erase = async (id) => connect()
.then((db) =>
  db
  .collection('products')
  .findOneAndDelete({ _id: ObjectId(id) }))
  .then((response) => (response.value));

module.exports = {
  listAll,
  selectById,
  selectByName,
  create,
  update,
  erase,
};

// const { ObjectId } = require('mongodb');

const { connect } = require('./connection');

const createProduct = async ({ name, quantity }) => connect()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const validateEqualName = async ({ name }) => connect()
  .then((db) => db.collection('products').findOne({ name }));

module.exports = {
  createProduct,
  validateEqualName,
};

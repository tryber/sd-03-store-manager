const mongoc = require('./connection');

const getProductByName = async (name) =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .findOne({name})
  );

const createProductInDB = async (name, quantity) =>
  mongoc.connect()
  .then((db) => db
    .collection('products')
    .insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

module.exports = {
  getProductByName,
  createProductInDB,
};

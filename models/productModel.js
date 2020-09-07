const connect = require('./connect');

const add = (name, quantity) =>
  connect().then((db) => db.collection('cats').insertOne({ name, quantity }));

module.exports = {
  add,
};

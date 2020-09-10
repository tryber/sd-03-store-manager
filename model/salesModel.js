const connect = require('./connect');

const insert = async (saleJson) => connect()
  .then((db) => db.collection('sales').insertOne(saleJson))
  .then



module.exports = {
  insert,
};

const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = () =>
  MongoClient
    .connect('mongodb://mongodb:27017/StoreManager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db('StoreManager'));

module.exports = connect;
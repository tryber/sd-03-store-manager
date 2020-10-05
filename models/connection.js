const { MongoClient } = require('mongodb');
require('dotenv/config');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = () =>
  MongoClient
    .connect(process.env.MONGO_DB_URL || MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(process.env.DB_NAME || DB_NAME));

module.exports = connect;

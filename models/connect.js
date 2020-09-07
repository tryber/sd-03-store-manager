require('dotenv/config');

const { MongoClient } = require('mongodb');

const DB_URI = 'mongodb://mongodb:27017/StoreManager';
const DB_DBNAME = 'StoreManager';

const connect = async () => (
  MongoClient.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => (
    connection.db(DB_DBNAME)))
);

module.exports = {
  connect,
};

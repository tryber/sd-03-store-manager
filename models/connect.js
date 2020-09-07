require('dotenv/config');
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = async () => MongoClient.connect('mongodb://localhost:27017/StoreManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db('StoreManager'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = {
  connect,
};

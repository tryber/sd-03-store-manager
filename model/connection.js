require('dotenv/config');
const { MongoClient } = require('mongodb');

// Testes automatizados
let MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
let DB_NAME = 'StoreManager';

// Rodando localmente
if (process.env.MONGO_DB_URL) {
  MONGO_DB_URL = process.env.MONGO_DB_URL;
  DB_NAME = process.env.DB_NAME;
}

const connect = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(connection => connection.db(DB_NAME));

module.exports = {
  connect,
};

const { MongoClient } = require('mongodb');
// Para o avaliador funcionar altere a conexão do banco para:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = () =>
  MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME));

module.exports = connect;

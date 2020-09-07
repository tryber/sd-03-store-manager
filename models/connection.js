const { MongoClient } = require('mongodb');
// require('dotenv/config');

// const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// para rodar localmente teste
/* const user = encodeURIComponent(DB_USER);
const password = encodeURIComponent(DB_PASSWORD);
const authMechanism = 'DEFAULT';

const MONGO_DB_URL = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`; */

// para rodar o avaliador github Trybe
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  connect,
};

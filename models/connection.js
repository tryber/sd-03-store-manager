const { MongoClient } = require('mongodb');

// MY WAY TO CONNECT
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connect = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// OTHER WAY - as Carolina Gomes tips on slack, sep 4th.
// require('dotenv/config');

// const { MONGO_DB_URL, DB_NAME } = process.env;
// const dbURL = MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
// const dbName = DB_NAME || 'StoreManager';

// const connect = () => MongoClient.connect(dbURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then((connection) => connection.db(dbName))
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

module.exports = {
  connect,
};

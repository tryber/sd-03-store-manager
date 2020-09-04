const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

module.exports = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connection) => connection.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

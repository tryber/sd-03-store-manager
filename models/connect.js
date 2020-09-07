const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

module.exports = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

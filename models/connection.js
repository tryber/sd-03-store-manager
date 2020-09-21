const mongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

module.exports = () => mongoClient
  .connect(process.env.MONGO_DB_URL || MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

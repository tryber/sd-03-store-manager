require('dotenv/config');
const { MongoClient } = require('mongodb');

const { DB_URI, DB_DBNAME } = process.env;

const connect = async () => MongoClient.connect('mongodb://localhost:27017/StoreManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(connection => connection.db('StoreManager'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

module.exports = {
  connect,
}
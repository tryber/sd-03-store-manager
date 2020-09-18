require('dotenv/config');
const { MongoClient } = require('mongodb');

// const { DB_URI, DB_DBNAME } = process.env;

const connect = async () => MongoClient.connect(
  'mongodb://mongodb:27017/StoreManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // As novas regras que o team do MongoDB criou,
    // mas ficam desativadas por default para fins de retrocompatibilidade
  }).then((connection) => connection.db('StoreManager'));

module.exports = connect;

const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const connect = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db('StoreManager'))
    .catch((erro) => {
      console.error(erro);
      process.exit(1);
    });

module.exports = connect;

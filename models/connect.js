const mongodb = require('mongodb').MongoClient;

const MONGODB_URL = 'mongodb://mongodb:27017';

const connect = () => mongodb.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db('StoreManager'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = { connect };

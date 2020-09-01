const { MongoClient } = require('mongodb');
require('dotenv/config');

const connect = () => MongoClient.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(process.env.DB_NAME));

module.exports = {
  connect,
};

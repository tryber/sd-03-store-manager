const { MongoClient } = require('mongodb');

const connect = () => MongoClient.connect('mongodb://mongodb:27017/StoreManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db('StoreManager'));

module.exports = {
  connect,
};

const { MongoClient } = require('mongodb');

const { CONNECT_URL = 'mongodb://mongodb:27017/StoreManager' } = process.env;

const { DB_NAME = 'StoreManager' } = process.env;

module.exports = async () => {
  try {
    const connection = await MongoClient.connect(CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(connection);
    return connection.db(DB_NAME);
  } catch (error) {
    throw new Error('connection refused');
  }
};

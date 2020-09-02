const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL = 'mongodb://mongodb:27017/StoreManager' } = process.env;

const { DB_NAME = 'StoreManager' } = process.env;

module.exports = async () => {
  try {
    const connection = await MongoClient.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection.db(DB_NAME);
  } catch (error) {
    throw new Error('connection refused');
  }
};

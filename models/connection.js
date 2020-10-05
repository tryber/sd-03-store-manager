const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL = 'mongodb://mongodb:27017/StoreManager' } = process.env;
const { DB_NAME = 'StoreManager' } = process.env;

// Connection setup inspirado na branch do hebert via https://github.com/tryber/sd-03-store-manager/blob/hebert-store-manager
const connect = async () => {
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

const connection = async (collection = '') => {
  try {
    const db = await connect();
    const dbCollection = db.collection(collection);
    return dbCollection;
  } catch (error) {
    throw new Error('connection refused');
  }
};

module.exports = { connection };

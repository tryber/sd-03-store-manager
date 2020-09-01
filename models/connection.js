const { MongoClient } = require('mongodb');

const CONNECT_URL = process.env.DB_URL || 'mongodb://mongodb:27017/StoreManager';

const APP_DB = process.env.DB_NAME || 'StoreManager';

module.exports = async () => {
  try {
    const connection = await MongoClient.connect(CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return connection.db(APP_DB);
  } catch (error) {
    throw new Error('connection refused');
  }
};

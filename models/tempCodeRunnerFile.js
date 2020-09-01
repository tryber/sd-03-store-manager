const { MongoClient } = require('mongodb');

const CONNECT_URL = 'mongodb://127.0.0.1:27017/';

const APP_DB = process.env.DB_NAME || 'StoreManager';

const connect = async () => {
  console.log(MongoClient, CONNECT_URL);
  try {
    const connection = await MongoClient.connect(CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(connection);
    return connection.db(APP_DB);
  } catch (error) {
    throw new Error('connection refused');
  }
};

console.log(connect());
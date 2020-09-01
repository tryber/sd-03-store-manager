const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const {
  MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager',
  DB_NAME = 'StoreManager'
} = process.env;

async function connect() {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn.db(DB_NAME);
  } catch (err) {
    console.error('inside connect', err);
    process.exit(1);
  }
}

async function connectTo(coll) {
  try {
    const db = await connect();
    return db.collection(coll);  
  } catch (err) {
    console.error('inside connectTo', err);
  }
}

module.exports = { connect, connectTo };

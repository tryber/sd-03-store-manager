const { MongoClient, ObjectID } = require('mongodb');
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

const connectAndFindAll = async (collection = '') => {
  try {
    const dbconnect = await connection(collection);
    const searchAll = await dbconnect.find().toArray();
    return searchAll;
  } catch (error) {
    throw new Error(`${collection} search failed`);
  }
};

const connectAndDeleteById = async (id, collection = '', message = '') => {
  try {
    const dbconnect = await connection(collection);
    const deleteQuery = await dbconnect.findOneAndDelete({ _id: ObjectID(id) });
    return deleteQuery.value;
  } catch (error) {
    throw new Error(message);
  }
};

const connectAndFindById = async (id, collection = '', message = '') => {
  try {
    const dbconnect = await connection(collection);
    const query = await dbconnect.findOne({ _id: ObjectID(id) });
    const { _id: returnedId } = query;
    if (!returnedId) throw new Error();
    return query;
  } catch (error) {
    throw new Error(message);
  }
};

module.exports = { connection, connectAndFindAll, connectAndDeleteById, connectAndFindById };

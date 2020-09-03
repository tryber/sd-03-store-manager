const { MongoClient, ObjectID } = require('mongodb');
require('dotenv').config();

const { DB_URL = 'mongodb://mongodb:27017/StoreManager' } = process.env;

const { DB_NAME = 'StoreManager' } = process.env;

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

const connection = async (collect = '') => {
  try {
    const db = await connect();
    const dbCollection = db.collection(collect);
    return dbCollection;
  } catch (error) {
    throw new Error('connection refused');
  }
};

const connectAndFindAll = async (collect = '') => {
  try {
    const dbconnect = await connection(collect);
    const searchAll = await dbconnect.find().toArray();
    return searchAll;
  } catch (error) {
    throw new Error(`${collect} search failed`);
  }
};

const connectAndDeleteById = async (id, collect = '', message = '') => {
  try {
    const dbconnect = await connection(collect);
    const deleteQuery = await dbconnect.findOneAndDelete({ _id: ObjectID(id) });
    const { _id, name, quantity } = deleteQuery.value;

    return { _id, name, quantity };
  } catch (error) {
    throw new Error(message);
  }
};

const connectAndFindById = async (id, collect = '', message = '') => {
  try {
    const dbconnect = await connection(collect);
    const query = await dbconnect.findOne({ _id: ObjectID(id) });
    if (!query.name) throw new Error();

    return query;
  } catch (error) {
    throw new Error(message);
  }
};

module.exports = { connection, connectAndFindAll, connectAndDeleteById, connectAndFindById };

const connection = require('./connection');

const createSales = async (products) => {
  try {
    const db = await connection();
    const salesRegister = await db.collection('sales').insertOne({ itensSold: [...products] });
    const { insertedId: _id } = salesRegister;
    const response = {
      _id,
      itensSold: [...products],
    };
    return response;
  } catch (error) {
    throw new Error(error.message || 'sales register failed');
  }
};

const getAllSales = async () => {
  try {
    const db = await connection();
    const searchAllSales = await db.collection('sales').find().toArray();
    return searchAllSales;
  } catch (error) {
    throw new Error('sales search failed');
  }
};

module.exports = { createSales, getAllSales };

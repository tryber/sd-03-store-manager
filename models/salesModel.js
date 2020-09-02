const connection = require('./connection');

const createSales = async (products) => {
  try {
    const connect = await connection('sales');
    const salesRegister = await connect.insertOne({ itensSold: [...products] });
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
    const connect = await connection('sales');
    const searchAllSales = await connect.find().toArray();
    return searchAllSales;
  } catch (error) {
    throw new Error('sales search failed');
  }
};

module.exports = { createSales, getAllSales };

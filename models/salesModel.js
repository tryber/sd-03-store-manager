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

module.exports = { createSales };

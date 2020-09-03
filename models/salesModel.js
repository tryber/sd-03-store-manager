const { ObjectID } = require('mongodb');
const { connection, connectAndFindAll } = require('./connection');

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

const updateSalesById = async (id, sale = []) => {
  const [product] = sale;
  const { productId, quantity } = product;
  const connect = await connection('sales');
  const salesUpdate = await connect.findOneAndUpdate(
    { _id: ObjectID(id), 'itensSold._id': ObjectID(productId) },
    { $set: { quantity } },
  );
  const { _id } = salesUpdate.value;
  return { _id, itensSold: [{ ...product }] };
};

const getAllSales = async () => {
  try {
    const searchAllSales = await connectAndFindAll('sales');
    return searchAllSales;
  } catch (error) {
    throw new Error('sales search failed');
  }
};

module.exports = { createSales, getAllSales, updateSalesById };

const {
    connection,
    connectAndFindAll,
    connectAndDeleteById,
    connectAndFindById,
  } = require('./connection');
const { ObjectID } = require('mongodb');

const registerSales = async (products) => {
  try {
    const connect = await connection('sales');
    const register = await connect.insertOne({ itensSold: [...products] });
    const { insertedId: _id } = register;
    const response = { _id };
    return response = { 
        _id,
        itensSold: [...products],
    };
  } catch (error) {
    throw new Error(error.message || 'sales register failed');
  }
};

const updateSaleById = async (id, sale = []) => {
  try {
    const [product] = sale;
    const connect = await connection('sales');
    const updater = await connect.findOneAndUpdate(
      { _id: ObjectID(id), 'itensSold.productId': product.productId  },
      { $set: { 'itensSold.$[].quantity':product.quantity } },
      { returnOriginal: false },
    );
    return updater.value;
  } catch (error) {
    throw new Error(error.message || 'sale update failed');
  }
};

const deleteSaleById = async (id) => {
  try {
    const deleter = await connectAndDeleteById(id, 'sales', 'Wrong id format');
    const { _id, itensSold } = deleter;
    return { _id, itensSold };
  } catch (error) {
    throw new Error('Wrong sale ID format');
  }
};

const getAllSales = async () => {
  try {
    const searchAllProducts = await connectAndFindAll('sales');
    return searchAllProducts;
  } catch (error) {
    throw new Error('sales search failed');
  }
};

const getSaleById = async (id) => {
  try {
    const query = connectAndFindById(id, 'sales', 'Wrong id format');
    return query;
  } catch (error) {
    throw new Error('Wrong id format');
  }
};

module.exports = {
  registerSales,
  updateSaleById,
  deleteSaleById,
  getAllSales,
  getSaleById,
};

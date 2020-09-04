const { ObjectID } = require('mongodb');
const {
  connection,
  connectAndFindAll,
  connectAndFindById,
  connectAndDeleteById,
} = require('./connection');

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

/* Fazendo update de itens em array usando operador
posicional. https://docs.mongodb.com/manual/reference/operator/update/positional-all/ */
const updateSalesById = async (id, sale = []) => {
  const [product] = sale;
  const { productId, quantity } = product;
  const connect = await connection('sales');
  const salesUpdate = await connect.findOneAndUpdate(
    { _id: ObjectID(id), 'itensSold.productId': productId },
    { $set: { 'itensSold.$[].quantity': quantity } },
    { returnOriginal: false },
  );

  return salesUpdate.value;
};

const deleteSaleById = async (id) => {
  try {
    const deleteQuery = await connectAndDeleteById(id, 'sales', 'Wrong sale ID format');
    const { _id, itensSold } = deleteQuery;

    return { _id, itensSold };
  } catch (error) {
    throw new Error('Wrong sale ID format');
  }
};

const getAllSales = async () => {
  try {
    const searchAllSales = await connectAndFindAll('sales');
    return searchAllSales;
  } catch (error) {
    throw new Error('sales search failed');
  }
};

const getSaleById = async (id) => {
  try {
    const query = connectAndFindById(id, 'sales', 'Sale not found');

    return query;
  } catch (error) {
    throw new Error('Sale not found');
  }
};

module.exports = { createSales, updateSalesById, deleteSaleById, getAllSales, getSaleById };

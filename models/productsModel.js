const { ObjectID } = require('mongodb');
const {
  connection,
  connectAndFindAll,
  connectAndDeleteById,
  connectAndFindById,
} = require('./connection');

const createProducts = async (name, quantity) => {
  try {
    const connect = await connection('products');
    const register = await connect.insertOne({ name, quantity });
    const { insertedId: _id } = register;
    const response = { _id, name, quantity };

    return response;
  } catch (error) {
    throw new Error(error.message || 'product register failed');
  }
};

const updateProductById = async (id, productName, productQuantity) => {
  try {
    const connect = await connection('products');
    const updateQuery = await connect.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name: productName, quantity: productQuantity } },
      { returnOriginal: false },
    );
    console.log(updateQuery);
    return updateQuery.value;
  } catch (error) {
    throw new Error(error.message || 'product update failed');
  }
};

const deleteProductById = async (id) => {
  try {
    const deleteQuery = await connectAndDeleteById(id, 'products', 'Wrong id format');
    const { _id, name, quantity } = deleteQuery;

    return { _id, name, quantity };
  } catch (error) {
    throw new Error('Wrong id format');
  }
};

const getAllProducts = async () => {
  try {
    const searchAllProducts = await connectAndFindAll('products');
    return searchAllProducts;
  } catch (error) {
    throw new Error('products search failed');
  }
};

const getProductByName = async (name) => {
  try {
    const connect = await connection('products');
    const searchQuery = connect.findOne({ name });
    return searchQuery;
  } catch (error) {
    throw new Error('product search failed');
  }
};

const getProductById = async (id) => {
  try {
    const query = connectAndFindById(id, 'products', 'Wrong id format');

    return query;
  } catch (error) {
    throw new Error('Wrong id format');
  }
};

module.exports = {
  createProducts,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductByName,
  getProductById,
};

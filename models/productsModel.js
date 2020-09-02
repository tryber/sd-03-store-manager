const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

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

const updateProductById = async (id, name, quantity) => {
  try {
    const connect = await connection('products');
    const updateQuery = await connect.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
    const { _id } = updateQuery.value;

    return { _id, name, quantity };
  } catch (error) {
    throw new Error(error.message || 'product update failed');
  }
};

const deleteProductById = async (id) => {
  try {
    const connect = await connection('products');
    const deleteQuery = await connect.findOneAndDelete({ _id: ObjectId(id) });
    const { _id, name, quantity } = deleteQuery.value;

    return { _id, name, quantity };
  } catch (error) {
    throw new Error('Wrong id format');
  }
};

const getAllProducts = async () => {
  try {
    const connect = await connection('products');
    const searchAll = await connect.find().toArray();
    return searchAll;
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
    const connect = await connection('products');
    const searchQuery = await connect.findOne(ObjectId(id));
    if (!searchQuery) throw new Error();
    return searchQuery;
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

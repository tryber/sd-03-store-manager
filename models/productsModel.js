const { connection } = require('./connection');

const registerProducts = async (name, quantity) => {
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

module.exports = {
  registerProducts,
};

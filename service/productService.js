const productModel = require('../model/productModel');

const getAll = async () => productModel.listAll();
const getById = async (id) => productModel.selectById(id);
const deleteOne = async (id) => productModel.erase(id);

// Regras de negócio
const insertOne = async (name, quantity) => {
  const isNotUniqueName = await productModel.selectByName(name);
  switch (true) {
    case name.length < 5:
      return {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    case quantity < 1:
      return {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    case isNaN(quantity):
      return {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    case isNotUniqueName.length > 0:
      return {
        code: 'invalid_data',
        message: 'Product already exists',
      };
    default:
      return productModel.create(name, quantity);
  }
};

const upsertOne = async (id, name, quantity) => {
  switch (true) {
    case name.length < 5:
      return {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    case quantity < 1:
      return {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    case isNaN(quantity):
      return {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    default:
      return productModel.update(id, name, quantity);
  }
};

module.exports = {
  getAll,
  getById,
  insertOne,
  upsertOne,
  deleteOne,
};

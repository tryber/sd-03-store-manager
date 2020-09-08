const productsModel = require('../model/productModel');
const productModel = require('../model/productModel');

const getAll = async () => productsModel.listAll();
const getById = async (id) => productsModel.selectById(id);

// Regras de negócio
const insertOne = async (name, quantity) => {
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
};

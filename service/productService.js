const productModel = require('../model/productModel');

const invaliDataError = { err: {
  code: 'invalid_data',
  message: 'Wrong id format',
} };

// Necessário para os testes. Verifica se o parâmetro passado é um hexadecimal de 24 dígitos.
const standarizedId = /^[0-9a-fA-F]{24}$/;

const getAll = async () => productModel.listAll();

const getById = async (id) => {
  let result = '';
  // Se a string passada bate com o regex...
  if (standarizedId.test(id)) { result = await productModel.selectById(id); }
  return result || invaliDataError;
};

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

const deleteOne = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await productModel.selectById(id); }
  return result ?
  productModel.erase(id) :
  invaliDataError;
};

module.exports = {
  getAll,
  getById,
  insertOne,
  upsertOne,
  deleteOne,
};

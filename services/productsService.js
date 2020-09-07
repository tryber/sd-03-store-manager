const productsModel = require('../models/productsModel');

const add = async (name, quantity) => {
  if(typeof(quantity) !== 'number') {
    return { code: 'invalid_data', message:'"quantity" must be a number' };
  }
  if (quantity <= 0) {
    return { code: 'invalid_data', message:'"quantity" must be larger than or equal to 1' };
  }
  if (name.length < 5) {
    return { code: 'invalid_data', message:'"name" length must be at least 5 characters long' };
  }
  if(await productsModel.findByName(name)) {
    return { code: 'invalid_data', message:'Product already exists' };
  }

  return await productsModel.add(name, quantity);
};

const listById = async (id) => {
  if(id.length < 24) return { code: 'invalid_data', message:'Wrong id format' };

  const product = await productsModel.findById(id);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  if(typeof(quantity) !== 'number') {
    return { code: 'invalid_data', message:'"quantity" must be a number' };
  }
  if (quantity <= 0) {
    return { code: 'invalid_data', message:'"quantity" must be larger than or equal to 1' };
  }
  if (name.length < 5) {
    return { code: 'invalid_data', message:'"name" length must be at least 5 characters long' };
  }
  return await productsModel.updateById(id, name, quantity);
};

const deleteById = async (id) => {
  if(id.length !== 24) return { code: 'invalid_data', message:'Wrong id format' };

  await productsModel.removeById(id);

  return null;
};

module.exports = {
  add,
  listById,
  updateProduct,
  deleteById,
};
const salesModel = require('../models/salesModel');

const add = async (products) => {
  const verify = products.every((e) => typeof(e.quantity) === 'number' && e.quantity > 0);
  
  if(verify === false) {
    return { code: 'invalid_data', message:'Wrong product ID or invalid quantity' };
  }

  return await salesModel.add(products);
};

const listById = async (id) => {
  if(id.length < 24) return { code: 'invalid_data', message:'Wrong id format' };

  const sale = await salesModel.findById(id);
  if(sale) return sale; 

  return { code:'not_found', message:'Sale not found' };
};

const updateSale = async (id, products) => {
  const verify = products.every((e) => typeof(e.quantity) === 'number' && e.quantity > 0);
  
  if(verify === false) {
    return { code: 'invalid_data', message:'Wrong product ID or invalid quantity' };
  }

  return await salesModel.updateById(id, products);
};

const deleteById = async (id) => {
  if(id.length !== 24) return { code: 'invalid_data', message:'Wrong sale ID format' };

  const sale = listById(id);

  if(!sale) return { code: 'invalid_data', message:'Wrong sale ID format' };

  await salesModel.removeById(id);

  return null;
};

module.exports = {
  add,
  listById,
  updateSale,
  deleteById,
}
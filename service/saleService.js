const salesModel = require('../model/salesModel');
const { selectById } = require('../model/productModel');

const err_generic = { err: {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
  }
}

const checkSales = async (jsons) => {
  jsons.forEach(({productId, quantity}) => {
    // console.log(element);
    if (isNaN(quantity) || quantity < 1)
      return err_generic;

    const { id } = selectById(productId);
    if (!id) return err_generic;
    return salesModel.insert(productId, quantity);
  });  
  salesModel.insert(jsons);
}


module.exports = {
  checkSales,
};

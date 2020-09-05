const productsModel = require('../models/Products');

const createProduct = async (name, quantity) => {   
    if (name >= 5) { 
    const createdProduct = await productsModel.createProduct(name, quantity);  
    return createdProduct;
    }
  };


  module.exports = {
    createProduct,
  };
  

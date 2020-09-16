const { productsModel } = require('../models');

const nameValidation = async (productName) => {
  const name = await productsModel.getProductByName(productName);

  switch (true) {
    case productName.length < 5:
      return {
        "err": {
          "code": "invalid_data",
          "message": "\"name\" length must be at least 5 characters long"
        }
      }
    case name.length > 0:
      return {
        "err": {
          "code": "invalid_data",
          "message": "Product already exists"
        }
      }
    default:
      return true;
  }
};

const quantityValidation = (productQuantity) => {
  switch (true) {
    case productQuantity <= 0:
      return {
        "err": {
          "code": "invalid_data",
          "message": "\"quantity\" must be larger than or equal to 1"
        }
      }
    case typeof(productQuantity) === 'string':
      return {
        "err": {
          "code": "invalid_data",
          "message": "\"quantity\" must be a number"
        }
      }
    default:
      return true;
  }
};

const productValidation = async (name, quantity) => {
  const productNameValidation = await nameValidation(name);
  const productQuantityValidation = quantityValidation(quantity);

  if (productNameValidation.err) return productNameValidation;
  
  if (productQuantityValidation.err) return productQuantityValidation;
  
  return true;
};

module.exports = productValidation;

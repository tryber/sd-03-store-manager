const validateEachQuantity = ({ quantity }) => typeof quantity === 'string' || quantity <= 0;

const saleValidation = (sales) => {
  const validation = sales.some(validateEachQuantity);

  if (validation) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return true;
};

module.exports = saleValidation;

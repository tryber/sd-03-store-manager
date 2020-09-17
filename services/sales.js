const Sales = require('../models/sales');
const Products = require('../models/products');

const errorHandler = (status) => {
  if (status === 422) {
    return {
      status: 422,
      err:
      { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  if (status === 404) {
    return {
      status: 404,
      err:
      { code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }
  return false;
};

const isSaleValid = async (data) => Promise.all(data.map(async ({ productId, quantity }) => {
  const findProduct = await Products.findById(productId);
  if (quantity < 1 || typeof quantity !== 'number' || !findProduct) {
    return 422;
  }
  if (quantity >= findProduct.quantity) {
    return 404;
  }
  return false;
}));

const validadeSale = async (data) => {
  const error = await isSaleValid(data);
  if (error.includes(404)) return errorHandler(404);
  if (error.includes(422)) return errorHandler(422);
  return {};
};

const listSales = async () => ({ sales: await Sales.getAll() });

const addSale = async (data) => {
  try {
    const validation = await validadeSale(data);
    if (validation.status) return validation;
    await Promise.all(data.map(async ({ productId, quantity }) => {
      const stock = await Products.findById(productId);
      const newStock = stock.quantity - quantity;
      await Products.update(productId, stock.name, newStock);
    }));
    const sales = await Sales.add(data);
    return { _id: sales.insertedId, itensSold: data };
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const findSale = async (id) => {
  const product = await Sales.findById(id);
  if (!product) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      error: true,
      status: 404,
    };
  }
  return product;
};

const updateSale = async (id, sale) => {
  const validation = await validadeSale(sale);
  if (validation.status) return validation;
  await Sales.update(id, sale);
  return { _id: id, itensSold: sale };
};

const deleteSale = async (id) => {
  // console.log('id', id);
  const found = await Sales.findById(id);
  console.log('found:', found);
  if (!found) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
      error: true,
      status: 404,
    };
  }
  await Promise.all(found.itensSold.map(async ({ productId, quantity }) => {
    const stock = await Products.findById(productId);
    const newStock = stock.quantity + quantity;
    await Products.update(productId, stock.name, newStock);
  }));
  await Sales.exclude(id);
  return found;
};

module.exports = { listSales, addSale, findSale, updateSale, deleteSale };

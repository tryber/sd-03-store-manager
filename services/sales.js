const Sales = require('../models/sales');
const Products = require('../models/products');

const validadeSale = async (data) => {
  const err = { err: { code: 'invalid_data' } };
  const error = await Promise.all(data.map(async ({ productId, quantity }) => {
    const findProduct = await Products.findById(productId);
    if (quantity < 1 || typeof quantity !== 'number' || !findProduct) {
      err.err.message = 'Wrong product ID or invalid quantity';
      err.error = true;
      err.status = 422;
      return true;
    }
    if (quantity >= findProduct.quantity) {
      err.err.message = 'Such amount is not permitted to sell';
      err.error = true;
      err.status = 404;
      err.err.code = 'stock_problem';
      return true;
    }

    return false;
  }));
  if (error.includes(true)) return err;
  return { error: false };
};

const listSales = async () => ({ sales: await Sales.getAll() });

const addSale = async (data) => {
  try {
    const validation = await validadeSale(data);
    if (validation.error) return validation;
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
  if (validation.error) return validation;
  await Sales.update(id, sale);
  return { _id: id, itensSold: sale };
};

const deleteSale = async (id) => {
  // console.log('id', id);
  const found = await Sales.findById(id);
  // console.log('found:', found);
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
  await Sales.exclude(id);
  return found;
};

module.exports = { listSales, addSale, findSale, updateSale, deleteSale };

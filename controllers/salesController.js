const {
  salesQuantityIsValid,
  addSale,
  allDatacollection,
  getSaleWithId,
  updateSaleById,
  validateId,
  deleteSaleById,
  stockVerification,
} = require('../service/salesServices');
const { updateProductQuantity } = require('../service/productsService');
const { ErrorHandler } = require('../utils/ErrorHandler');

const insertSale = async (req, res, next) => {
  try {
    const userSale = req.body;

    await Promise.all(
      userSale.map(async ({ productId, quantity }) => {
        const salesQnty = salesQuantityIsValid(quantity);
        const productQnty = await stockVerification(productId, quantity);
        if (salesQnty) {
          throw new ErrorHandler(422, salesQnty, 'invalid_data');
        }
        if (productQnty) {
          throw new ErrorHandler(404, productQnty, 'stock_problem');
        }
      }),
    );

    userSale.forEach(async ({ productId, quantity }) => {
      await updateProductQuantity(productId, quantity, '-');
    });

    const sales = await addSale(userSale);
    return res.status(200).json(sales[0]);
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await allDatacollection('sales');
    if (!sales) {
      throw new ErrorHandler(204, 'There is no sale yet', 'invalid_data');
    }
    return res.status(200).json({ sales });
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await getSaleWithId(id);

    if (!sale) {
      throw new ErrorHandler(404, 'Sale not found', 'not_found');
    }

    return res.status(200).json({ sale });
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newSale = req.body;

    newSale.forEach(({ quantity }) => {
      const salesQnty = salesQuantityIsValid(quantity);
      if (salesQnty) {
        throw new ErrorHandler(422, salesQnty, 'invalid_data');
      }
    });

    const updatedSale = await updateSaleById(id, newSale);
    return res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idIsValid = validateId(id);

    if (idIsValid) {
      throw new ErrorHandler(422, 'Wrong sale ID format', 'invalid_data');
    }

    const sale = await deleteSaleById(id);

    if (sale === null) {
      throw new ErrorHandler(404, 'Sale not Found', 'invalid_data');
    }

    sale.itensSold.forEach(async ({ productId, quantity }) => {
      await updateProductQuantity(productId, quantity, '+');
    });

    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};

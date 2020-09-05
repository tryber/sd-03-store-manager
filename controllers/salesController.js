const {
  salesQuantityIsValid,
  addSale,
  // collectionExists,
} = require('../service/salesServices');
const { ErrorHandler } = require('../utils/ErrorHandler');

const insertSale = async (req, res, next) => {
  try {
    const userSale = req.body;

    userSale.forEach(({ quantity }) => {
      const salesQnty = salesQuantityIsValid(quantity);

      if (salesQnty) {
        throw new ErrorHandler(422, salesQnty, 'invalid_data');
      }
    });

    const sales = await addSale(userSale);
    return res.status(200).json({ sales });
  } catch (error) {
    next(error);
  }
};

const getAllSales = (req, res, next) => {

};

const getSalesById = (req, res, next) => {

};

module.exports = {
  insertSale,
  getAllSales,
  getSalesById,
};

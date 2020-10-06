const {
    createSale,
    listSales,
    updateSaleQuantity,
    readOrDeleteSaleById,
  } = require('../services/salesServices');
const { generateError } = require('./errorMiddleware');

const errorGenerator = (error) => {
  const status = error.message === 'Such amount is not permitted to sell' ? 404 : 422;
  const code = error.message === 'Such amount is not permitted to sell' ? 'stock_problem' : 'invalid_data';
  const err = generateError(status, error, code);
  return err;
};

const salesCreate = async (req, res, next) => {
  try {
    const sale = await createSale(req.body);
    if (sale.message || null) throw new Error(sale.message);
    return res.status(200).json(sale);
  } catch (error) {
    return next(errorGenerator(error));
  }
};

const modifySale = async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;
  try {
    const updateSale = await updateSaleQuantity(id, sale);
    if (updateSale.message) throw new Error(updateSale.message);
    return res.status(200).json(updateSale);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

const deleteReadSale = (operation = 'read', code = 'not_found', status = 404) => async (
  req,
  res,
  next,
  ) => {
  const { id } = req.params;
  try {
    const saleInfo = await readOrDeleteSaleById(id, operation);
    return res.status(200).json(saleInfo);
  } catch (error) {
    const err = generateError(status, error, code);
    return next(err);
  }
};

const salesList = async (_req, res, next) => {
  try {
    const saleslist = await listSales();
    return res.status(200).json({ sales: saleslist });
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

module.exports = { salesCreate, modifySale, deleteReadSale, salesList };

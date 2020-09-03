const { createSale, listSales, updateSaleQuantity } = require('../services/salesServices');
const { generateError } = require('../controllers/utils');

const salesCreate = async (req, res, next) => {
  try {
    const sale = await createSale(req.body);

    if (sale.message || null) throw new Error(sale.message);

    return res.status(200).json(sale);
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

const modifySale = async (req, res, next) => {
  const [sale] = req.body;
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

const salesList = async (_req, res, next) => {
  try {
    const saleslist = await listSales();

    return res.status(200).json({ sales: saleslist });
  } catch (error) {
    const err = generateError(422, error, 'invalid_data');
    return next(err);
  }
};

module.exports = { salesCreate, salesList, modifySale };

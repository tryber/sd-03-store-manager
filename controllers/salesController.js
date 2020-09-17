const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  
  return res.status(200).json({ sales });
};

const createSale = async (req, res) => {
  const sales = req.body;

  const createdSale = await salesService.createSale(sales);

  if (createdSale.err) return res.status(422).json(createdSale);

  return res.status(200).json(createdSale);
};

module.exports = {
  getAllSales,
  createSale,
};

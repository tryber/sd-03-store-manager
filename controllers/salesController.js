const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(200).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.err) return res.status(404).json(sale);

  return res.status(200).json(sale);
};

const createSale = async (req, res) => {
  const sales = req.body;

  const createdSale = await salesService.createSale(sales);

  if (createdSale.err) {
    if (createdSale.err.code === 'stock_problem') return res.status(404).json(createdSale);
    return res.status(422).json(createdSale);
  };
  return res.status(200).json(createdSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const newSale = await salesService.updateSale(id, sale);

  if (newSale.err) return res.status(422).json(newSale);

  return res.status(200).json(newSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  if (id.length < 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  const sale = await salesService.deleteSale(id);

  if (sale && sale.err) return res.status(404).json(sale);

  return res.status(200).end();
};

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
};

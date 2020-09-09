const { Router } = require('express');

const service = require('../services/sales');

const salesRouter = Router();

const listSales = async (_req, res) => {
  const result = await service.listSales();
  if (result.error) return res.status(422).json({ err: result.err });
  res.status(200).json(result);
};

const newSale = async (req, res) => {
  try {
    const data = req.body;
    const result = await service.addSale(data);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

const findSaleById = async (req, res) => {
  try {
    const result = await service.findSale(req.params.id);
    if (result.error) return res.status(result.status || 422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const editSale = async (req, res) => {
  try {
    const result = await service.updateSale(req.params.id, req.body);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
const removeProduct = async (req, res) => {
  try {
    // console.log(req.params);
    const result = await service.deleteSale(req.params.id);
    if (result.error) return res.status(422).json({ err: result.err });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

salesRouter
  .route('/')
  .get(listSales)
  .post(newSale);

salesRouter
  .route('/:id')
  .get(findSaleById)
  .put(editSale)
  .delete(removeProduct);

module.exports = salesRouter;

const { Router } = require('express');
const {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
} = require('../services/salesService');

const sales = Router();

sales.post('/sales', async (req, res) => {
  const [{ productId, quantity }] = req.body;
  // console.log('limpo1,', productId, quantity);

  const register = await registeringSales(productId, quantity);
  const { _id: id } = register;
  const createRegister = {
    _id: id,
    itensSold: [register],
  };

  if (register.err) {
    return res.status(422).json(register);
  }
  return res.status(201).json(createRegister);
});

sales.get('/sales', async (req, res) => {
  const resultSales = await listSales();
  const { _id: id } = resultSales;

  const salesObj = {
    _id: id,
    itensSold: [resultSales],
  };
  return res.status(200).json(salesObj);
});

sales.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const resulstById = await listSalesById(id);

  const salesObj = {
    _id: id,
    itensSold: [resulstById],
  };
  return res.status(200).json(salesObj);
});

sales.put('/sales/:id', async (req, res) => {
  const { productId, quantity } = req.body;
  const update = await updateSales(productId, quantity);
  if (update.err) {
    return res.status(422).json(update);
  }
  return res.status(200).json(update);
});

sales.delete('/sales/:id', async (req, res) => {

});

module.exports = { sales };

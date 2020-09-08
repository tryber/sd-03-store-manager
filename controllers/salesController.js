const { Router } = require('express');
const {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
  deleteSales,
} = require('../services/salesService');

const sales = Router();

const { validateParams, validateId } = require('../services/libValidation');

const validateSales = (id, quantity) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(id)) {
    return { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
  }
  if (validateParams(quantity)) {
    return { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };
  }
};
// inspirate by MarcoBarbosa
// https://github.com/tryber/sd-03-store-manager/blob/marco-barbosa-sd-03-store-manager/controllers/salesController.js
sales.post('/sales', async (req, res) => {
  const products = req.body;

  let result;
  products
    .map((e) => validateSales(e.productId, e.quantity))
    .forEach((e) => {
      if (e !== 'undefined') {
        result = e;
      }
      return null;
    });

  if (result) {
    return res.status(422).json(result);
  }
  const register = await registeringSales(products);
  return res.status(200).json(register);
});

sales.get('/sales', async (_req, res) => {
  const resultSales = await listSales();
  return res.status(200).send({ sales: resultSales });
});

sales.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const idIsValid = validateId(id);

  if (idIsValid) {
    return res.status(422).send(idIsValid);
  }
  const resulstById = await listSalesById(id);
  return res.status(200).json(resulstById);
});

sales.put('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  const saleExistForUpdate = await listSalesById(id);
  const productIdToUpdate = saleExistForUpdate.itensSold.filter((e) => e.product === productId);

  if (!productIdToUpdate) {
    const validate = validateParams(quantity);
    return res.status(422).json(validate);
  }
  const validation = validateSales(productId, quantity);

  if (validation) {
    return res.status(422).json(validation);
  }
  const update = await updateSales(id, productId, quantity);
  return res.status(200).json(update);
});

sales.delete('/sales/:id', async (req, res) => {
  const errMessage = { err: { message: 'Wrong sale ID format', code: 'invalid_data' } };
  const { params } = req;
  const { id } = params;
  const idIsvalid = validateId(id);

  if (idIsvalid) {
    return res.status(422).json(errMessage);
  }

  const saleExits = await listSalesById(id);
  const { itensSold } = saleExits;
  if (!saleExits) {
    return res.status(422).json(errMessage);
  }

  await deleteSales(id);
  return res.status(200).send(saleExits);
});

module.exports = { sales };

const { Router } = require('express');
// const rescue = require('express-rescue');
const {
  registeringSales,
  listSales,
  listSalesById,
  updateSales,
  deleteSales,
} = require('../services/salesService');

const sales = Router();

const { validateParams } = require('../services/libValidation');

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
    .map((e) => {
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
  const idIsValid = validateSales(id);

  if (idIsValid) {
    return res.status(422).send(idIsValid);
  }
  const resulstById = await listSalesById(id);
  return res.status(200).json(resulstById);
});

sales.put('/sales/:id', async (req, res) => {
  const products = req.body;
  const { id } = req.params;
  const update = await updateSales(id, products);
  if (update.err) {
    return res.status(422).json(update);
  }
  return res.status(200).json(update);
});

const validDeleteId = (id) => {
  // const newId = parseInt(id, 10);
  const regex = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
  const result = regex.test(id);
  if (!result) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  return null;
};

sales.delete('/sales/:id', async (req, res) => {
  const errMessage = { err: { message: 'Wrong sale ID format', code: 'invalid_data' } };
  const { params } = req;
  const { id } = params;
  const idIsvalid = validDeleteId(id);
  // const { itensSold } = productExits;

  // let productTodelete;
  // let quantityTodelete;
  // await itensSold.forEach((e) => {
  //   quantityTodelete = e.quantity;
  //   productTodelete = e.productId;
  //   return null;
  // });
  if (idIsvalid) {
    return res.status(422).json(errMessage);
  }

  const saleExits = await listSalesById(id);

  if (!saleExits) {
    return res.status(422).json(errMessage);
  }
  await deleteSales(id);
  console.log('sera que foi chamado', deleteSales(id));
  return res.status(200).json(errMessage);
});

module.exports = { sales };

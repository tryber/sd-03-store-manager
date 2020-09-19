// CONTROLLER: trata as requisições e envia somente o necessário para o service!
const express = require('express');
const { CreateSale, ReturnSales, UpdateSale } = require('../services/salesS');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const sales = await ReturnSales();
    return res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    return next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const sale = await ReturnSales(req.params.id);
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    return next({ status: 422,
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const sale = await CreateSale(req.body);
    if (!sale) {
      return next({ status: 422,
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      });
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    return err;
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const updatedSales = await UpdateSale(id, product);
    return res.status(200).json(updatedSales);
  } catch (err) {
    return next({ status: 422,
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    });
  }
});

// router.delete('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     next();
//   }
// });

module.exports = router;

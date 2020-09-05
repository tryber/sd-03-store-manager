const Sales = require('../models/sales');
const Validation = require('../services/validations');

async function validation(req) {
  const data = req.body;
  const { message } = await Validation.validateSale(data);
  const stock = await Validation.validateStock(data);

  if (message) {
    throw new Error(message);
  }
  if (!stock) {
    throw new Error('Such amount is not permitted to sell');
  }
  return data;
}

async function list(res, cb) {
  const sales = await cb();
  res.status(200).send({ sales });
}

async function createSale(req, res) {
  try {
    const data = await validation(req);
    const sale = await Sales.createSale(data);
    res.status(200).send(sale);
  } catch (error) {
    let status = 422;
    let code = 'invalid_data';
    if (error.message === 'Such amount is not permitted to sell') {
      status = 404;
      code = 'stock_problem';
    }

    const err = {
      err: {
        code, message: error.message,
      },
    };
    res.status(status).send(err);
  }
}

async function listSales(_req, res) {
  try {
    await list(res, Sales.listSales);
  } catch (error) {
    res.status(404).send([]);
  }
}

async function getSale(req, res) {
  try {
    const sale = await Sales.getSaleById(req.params.id);
    if (!sale) {
      throw new Error();
    }

    res.status(201).send(sale);
  } catch (error) {
    res.status(404).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
}

async function updateSale(req, res) {
  const { id } = req.params;
  const sale = req.body;
  const { message } = await Validation.validateSale(sale);
  if (message) {
    const err = {
      err: {
        code: 'invalid_data', message,
      },
    };
    return res.status(422).send(err);
  }
  const Sale = await Sales.updateSale(id, sale);
  res.status(200).send(Sale);
}

async function deleteSale(req, res) {
  try {
    const sale = await Sales.deleteSale(req.params.id);
    res.status(200).send(sale);
  } catch (error) {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
}

module.exports = {
  createSale,
  listSales,
  getSale,
  updateSale,
  deleteSale,
};

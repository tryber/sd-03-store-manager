const Sales = require('../models/sales');
const Validation = require('../services/validations');

async function createSale(req, res) {
  try {
    const data = req.body;
    const { message } = await Validation.validadeSale(data);
    if (message) {
      throw new Error(message);
    }
    const sale = await Sales.createSale(data);
    res.status(200).send(sale);
  } catch (error) {
    const err = {
      err: {
        code: 'invalid_data', message: error.message,
      },
    };
    res.status(422).send(err);
  }
}

async function listSales(req, res) {
  try {
    const sales = await Sales.listSales();
    res.status(200).send({ sales });
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
  try {
    const { id } = req.params;
    const sale = req.body;
    const { message } = await Validation.validadeSale(sale);
    if (message) {
      throw new Error(message);
    }
    const Sale = await Sales.updateSale(id, sale);
    res.status(200).send(Sale);
  } catch (error) {
    const err = {
      err: {
        code: 'invalid_data', message: error.message,
      },
    };
    res.status(422).send(err);
  }
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

module.exports = { createSale, listSales, getSale, updateSale, deleteSale };

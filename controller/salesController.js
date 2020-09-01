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

module.exports = { createSale };

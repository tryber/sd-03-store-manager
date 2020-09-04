// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const Boom = require('@hapi/boom');
const salesController = require('./sales/salesController');
const { productsRouter } = require('./products/productsController');

const app = express();

app.use(bodyParser.json());

app.use((request, _, next) => {
  console.log(`${request.method} ${request.path}`);
  next();
});

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

// app.get('/products', productsController.listProducts);
// app.post('/products', productsController.newProduct);

// app.get('/sales', salesController.listSales);

app.use((error, _req, res, _next) => {
  if (error.code === 11000) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  if (error.status) {
    return res.status(error.status).json({ err: { code: error.code, message: error.message } });
  }
  console.log(error);
  return res.status(500).json({ message: error.message, stack: error.stack });
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});

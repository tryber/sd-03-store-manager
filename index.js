// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const salesController = require('./sales/salesController');
const productsController = require('./products/productsController');

const app = express();

app.use(bodyParser.json());

app.use((request, _, next) => {
  console.log(`${request.method} ${request.path}`);
  next();
});

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.listProducts);
app.post('/products', productsController.newProduct);

// app.get('/sales', salesController.listSales);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});

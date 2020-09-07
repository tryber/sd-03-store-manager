const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// End-points de Products
app.use('/products', productsController);

// End-points de Sales
app.use('/sales', salesController);

app.listen(3000, () => console.log('ouvindo na porta 3000'));

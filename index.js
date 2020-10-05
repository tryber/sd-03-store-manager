const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const productsRouter = require('./controllers/productsController');

const salesRouter = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_req, res) => {
  res.send();
});

app.use((request, _, next) => {
  console.log(`${request.method} ${request.path}`);
  console.log('body', request.body);
  next();
});

app.use('/products', rescue(productsRouter));

app.use('/sales', rescue(salesRouter));

app.listen(3000, console.log('Listening on port 3000'));

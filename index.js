const boom = require('@hapi/boom');
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController.js');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController);
app.use('/sales', salesController);

app.use((err, _, res, _next) => {
  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  return res.status(500).json({ message: 'Internal error' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const Boom = require('@hapi/boom');
const { productsRouter } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/ping', (_req, res) => {
    console.log('here')
    res.send('pong!')
});

app.use('/products', productsRouter);

app.all('*')
  .get((_req, res) => res.json({ message: '<recurso> não encontrado' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  if (Boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  res.json({ status: 500, message: err.message, data: err.stack });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController);

app.use((err, _, res, _next) =>
  (err
    ? res.status(err.status).json(err.payload)
    : res.status(500).json({ message: 'Internal error' })));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listen port ${PORT}`));

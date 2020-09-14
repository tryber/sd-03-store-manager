const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/productsC');
const errorHandler = require('./services/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', products);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(errorHandler);

app.listen(3000, () => console.log('listening on port 3000'));

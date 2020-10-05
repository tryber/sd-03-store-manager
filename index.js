const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/productsController');
const sales = require('./controllers/salesController');
const error = require('./services/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', products);
app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(error);

app.listen(3000, () => console.log('Ouvindo porta 3k!'));

// referencias.
// https://www.udemy.com/course/curso-completo-do-desenvolvedor-nodejs/
// https://www.udemy.com/course/curso-web/
// https://app.rocketseat.com.br/node/curso-node-js
// bodyParser https://www.youtube.com/watch?v=P1OI_EKyl6U

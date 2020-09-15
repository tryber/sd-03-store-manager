const express = require('express');
const bodyParser = require('body-parser');
const { productsRouter, salesRouter } = require('./controllers');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.listen(PORT, () => console.log(`Listen on ${PORT}`));

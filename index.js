const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controller');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(3000, () => console.log('Listen on 3000'));

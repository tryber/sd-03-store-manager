const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.post('/products', productsController.newProduct);

app.listen(3000, () => console.log('ouvindo na porta 3000'));

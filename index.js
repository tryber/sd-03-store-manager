const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.post('/products', productsController.createProduct);

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductById);

app.listen(3000, () => console.log('ouvindo na porta 3000'));

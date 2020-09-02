const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// End-points de Products
app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);

app.delete('/products/:id', productsController.deleteProduct);

// End-points de Sales
app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);

app.listen(3000, () => console.log('ouvindo na porta 3000'));

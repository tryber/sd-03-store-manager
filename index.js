const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.post('/products', productController.addProduct);
app.get('/products', productController.listAllProducts);
app.get('/products/:id', productController.findProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.addSale);
app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.findSale);
app.put('/sales/:id', salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});

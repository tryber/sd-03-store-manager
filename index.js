const express = require('express');
const bodyParse = require('body-parser');
const products = require('./controllers/productControllers');
const sales = require('./controllers/saleController');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products/:id', products.findProductById);
app.get('/products', products.findAllProducts);
app.post('/products', products.createProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

app.get('/sales/:id', sales.findSaleById);
app.get('/sales', sales.findAllSale);
app.post('/sales', sales.createSale);
app.put('/sales/:id', sales.updateSale);
app.delete('/sales/:id', sales.deleteSale);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

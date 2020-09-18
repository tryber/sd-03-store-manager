const express = require('express');
const bodyParser = require('body-parser');
// const { connect } = require('./models/connection');
const { productsController, salesController } = require('./controllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);

app.delete('/sales/:id', salesController.deleteSale);

/* connect().then((session) => {
  console.log('Conectado ao mongodb!');
}); */
app.listen(3000, () => console.log('Ouvindo na porta 3000'));

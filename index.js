const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller/controller');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAllProducts);
app.get('/products/:id', controller.getProductById);
app.post('/products', controller.createProduct);
app.put('/products/:id', controller.updateProduct);
app.delete('/products/:id', controller.deleteProduct);
app.get('/sales', controller.getAllSales);
app.post('/sales', controller.createSale);
app.get('/sales/:id', controller.getSaleById);
app.put('/sales/:id', controller.updateSale);
app.delete('/sales/:id', controller.deleteSale);

app.listen(3000, () => { console.log('Ouvindo a porta 3000!'); });

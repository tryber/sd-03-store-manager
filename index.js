require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.get('/products', controllers.productsController.listProducts);
app.post('/products', controllers.productsController.addProduct);
app.get('/products/:id', controllers.productsController.findProductById);
app.put('/products/:id', controllers.productsController.updateProductById);
app.delete('/products/:id', controllers.productsController.deleteProduct);

app.get('/sales', controllers.salesController.listSales);
app.post('/sales', controllers.salesController.addSale);
app.get('/sales/:id', controllers.salesController.findSaleById);
app.put('/sales/:id', controllers.salesController.updateSaleById);
app.delete('/sales/:id', controllers.salesController.deleteSale);

app.listen(3000, () => console.log('Listening on 3000'))
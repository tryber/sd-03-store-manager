const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.post('/sales', controllers.salesController.createSale);

app.get('/products', controllers.productsController.showAllProducts);
app.post('/products', controllers.productsController.createProduct);
app.get('/products/:id', controllers.productsController.getProductById);
app.put('/products/:id', controllers.productsController.updateProductById);
app.delete('/products/:id', controllers.productsController.deleteProductById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });

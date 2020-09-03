const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.get('/products', controllers.productsController.showAllProducts);
app.get('/products/:id', controllers.productsController.getProductById);
app.post('/products', controllers.productsController.createProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });

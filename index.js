const express = require('express');
const bodyParse = require('body-parser');
const products = require('./controllers/productControllers');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.get('/products/:id', products.findProductById);
app.get('/products', products.findAllProducts);
app.post('/products', products.createProduct);


const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`)});

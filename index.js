const express = require('express');
const bodyParse = require('body-parser');
const products = require('./controllers/productControllers');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.post('/products', products.createProduct);
app.get('/product', products.allProducts)

const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`)});

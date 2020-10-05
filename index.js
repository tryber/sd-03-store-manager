const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsController = require('./controllers/productsController');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use('/products', productsController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.listen(PORT, () => console.log(`Listen port ${PORT}`));

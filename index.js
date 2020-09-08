const bodyParser = require('body-parser');
const express = require('express');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.use('/products', productsControllers);

app.use('/sales', salesControllers);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });

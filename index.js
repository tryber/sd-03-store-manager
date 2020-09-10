const productRouter = require('./routers/productRouter');
const salesRouter = require('./routers/salesRouter');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

// Endpoint para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send('');
});

app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);
// Todas as requisições feitas para '/' em produtos são redirecionadas para esse router
// Ídem para o de sales

app.listen(3000, () => { console.log('Escutando na porta 3k'); });

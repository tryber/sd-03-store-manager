const express = require('express');
const bodyParser = require('body-parser');

const { products } = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.post('/products', products);

app.get('/products', products);
app.get('/products/:id', products);

// app.use((err, _req, res, _next) => {
//   if (err) {
//     return res.status(303).json({ message: 'Error caiu no if' });
//   }
//   return res.status(500).json({ message: 'Error do else' });
// });

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

const {PORT = 3000} = process.env;

app.listen(PORT, () => {
    console.log(`Port ${PORT} successfully connected!`)
})
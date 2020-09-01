const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ok'));

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
    res.send();
});

app.listen(3000, () => console.log('Listening on 3000'));

//index.js
const controllers = require('./controllers/dogsController')

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(controllers);

PORT = process.env.PORT
app.listen(3000, () => {
    console.log(`The server is listening on server 3000`)
})
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(require('./routes/index'));
var bodyParser = require('body-parser');

module.exports = app;
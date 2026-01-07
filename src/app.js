const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const classifyRoutes = require('./routes/classifyRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/classify', classifyRoutes);

module.exports = app;


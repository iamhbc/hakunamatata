'use strict';
const express = require('express');
const path = require('node:path');
const haikuController = require('./controllers/haiku-controller');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', haikuController.index);

module.exports = app;

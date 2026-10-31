'use strict';
const Haiku = require('../models/haiku');

exports.index = (_req, res) => res.render('index', { haikus: Haiku.list() });

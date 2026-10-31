'use strict';
const haikus = require('../haikus.json');

exports.list = () => haikus.map(haiku => ({ ...haiku }));

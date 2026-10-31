'use strict';
const app = require('./app');

// Preserve numeric ports and IIS named pipes supplied through PORT.
app.listen(process.env.PORT || 3000);

const express = require('express');
const morgan = require('morgan');

const { getSeats } = require('./handlers');

const PORT = 5678;

var app = express();

app.get('/seats', getSeats);

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));


const server = app.listen(PORT, function () {
  console.info('🌍 Listening on port ' + server.address().port);
});

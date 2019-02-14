const express = require('express');

const app = express();

function expressLog(req, res, next) {
  console.log(req.url, req.method);
  next();
}

app.use(expressLog, (req, res, next) => {
  console.log('Node Start!!!');
  next();
});

// prevent favicon request
app.get('/favicon.ico', (req, res) => res.status(302));

app.use('/users', (req, res, next) => {
  console.log('Users page');
  res.send('<h2>Hello Users!!</h2><ul><li>JSON</li><li>XML</li></ul>');
});

app.use('/', (req, res, next) => {
  console.log('Hello World page');
  res.send('<h2>Hello World!!</h2>');
});

app.listen(3000);
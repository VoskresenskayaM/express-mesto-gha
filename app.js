const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '646b292a6fa0749ea51b49e1',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', routes);

app.listen(PORT, () => {});

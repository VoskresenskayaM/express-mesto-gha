const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');
const routes = require('./routes/routes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
const app = express();
app.use(limiter);
app.use(helmet());
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
app.listen(process.env.PORT, () => {});

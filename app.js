const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const HandlerError = require('./errors/HandlerError');
const {
  PORT, DB_ADDRESS,
} = require('./utils');
const routes = require('./routes/routes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_ADDRESS);
app.use('/', routes);
app.use(errors());
app.use(HandlerError);
app.listen(PORT, () => { });

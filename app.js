const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const mongoose = require('mongoose');
const HandlerError = require('./errors/HandlerError');
const { PORT } = require('./utils');
const routes = require('./routes/routes');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const app = express();
app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/\S+/),
    email: Joi.string().required().pattern(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/),
    password: Joi.string().required().pattern(/[0-9]/),
  }),
}), createUser);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/),
      password: Joi.string().required().pattern(/[0-9]/),
    }),
  }),

  login,
);
app.use(auth);
app.use('/', routes);

app.use(errors());
app.use(HandlerError);
app.listen(PORT, () => { });

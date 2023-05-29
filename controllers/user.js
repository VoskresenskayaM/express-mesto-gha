const User = require('../models/user');
const { incorrectId, notFound, serverError } = require('../utils')

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(serverError).send({
      message: 'Произошла ошибка на сервере',
    }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) res.send({ data: user });
      else {
        res.status(notFound).send({
          message: 'Пользователь не найден',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(incorrectId).send({
          message: 'Некорректный id карточки',
        });
        return;
      }
      res.status(serverError).send({
        message: 'Произошла ошибка на сервере',
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectId).send({
          message: 'Некорректные данные карточки',
        });
        return;
      }
      res.status(serverError).send({
        message: 'Произошла ошибка на сервере',
      });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectId).send({
          message: 'Некорректные данные пользователя',
        });
        return;
      }
      res.status(serverError).send({
        message: 'Произошла ошибка на сервере',
      });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectId).send({
          message: 'Некорректные данные пользователя',
        });
        return;
      }
      res.status(serverError).send({
        message: 'Произошла ошибка на сервере',
      });
    });
};

const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка на сервере',
      err: err.message,
      stack: err.stack,
    }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) res.status(200).send({ data: user });
      else {
        res.status(404).send({
          message: 'Пользователь не найден',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Некорректный id карточки',
          err: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Произошла ошибка на сервере',
        err: err.name,
        stack: err.stack,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Некорректные данные карточки',
          err: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.name,
        stack: err.stack,
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Некорректные данные пользователя',
          err: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Произошла ошибка на сервере',
        err: err.name,
        stack: err.stack,
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
        res.status(400).send({
          message: 'Некорректные данные пользователя',
          err: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.name,
        stack: err.stack,
      });
    });
};

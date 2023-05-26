const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(process.env.SERVER_ERROR).send({
      message: 'Произошла ошибка на сервере',
    }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) res.send({ data: user });
      else {
        res.status(process.env.NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(process.env.INCORRECT_ID).send({
          message: 'Некорректный id карточки',
        });
        return;
      }
      res.status(process.env.SERVER_ERROR).send({
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
        res.status(process.env.INCORRECT_ID).send({
          message: 'Некорректные данные карточки',
        });
        return;
      }
      res.status(process.env.SERVER_ERROR).send({
        message: 'Произошла ошибка',
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
        res.status(process.env.INCORRECT_ID).send({
          message: 'Некорректные данные пользователя',
        });
        return;
      }
      res.status(process.env.SERVER_ERROR).send({
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
        res.status(process.env.INCORRECT_ID).send({
          message: 'Некорректные данные пользователя',
        });
        return;
      }
      res.status(process.env.SERVER_ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

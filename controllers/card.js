const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка на сервере',
      err: err.message,
      stack: err.stack,
    }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) res.status(200).send({ data: card });
      else {
        res.status(404).send({
          message: 'Карточка не найдена',
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
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

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send({
    message: 'Произошла ошибка на сервере',
    err: err.name,
    stack: err.stack,
  }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send({
    message: 'Произошла ошибка на сервере',
    err: err.name,
    stack: err.stack,
  }));

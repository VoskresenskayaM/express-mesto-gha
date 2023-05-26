const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(process.env.SERVER_ERROR).send({
      message: 'Произошла ошибка на сервере',
    }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) res.send({ data: card });
      else {
        res.status(process.env.NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(process.env.INCORRECT_ID).send({
          message: 'Некорректный id карточки',
          err: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(process.env.SERVER_ERROR).send({
        message: 'Произошла ошибка на сервере',
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
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

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) res.send({ data: card });
    else {
      res.status(process.env.NOT_FOUND).send({
        message: 'Карточка не найдена',
      });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(process.env.INCORRECT_ID).send({
        message: 'Некорректные данные карточки',
      });
      return;
    }
    res.status(process.env.SERVER_ERROR).send({
      message: 'Произошла ошибка на сервере',
    });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (card) res.send({ data: card });
  else {
    res.status(process.env.NOT_FOUND).send({
      message: 'Карточка не найдена',
    });
  }
})
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(process.env.INCORRECT_ID).send({
        message: 'Некорректные данные карточки',
      });
      return;
    }
    res.status(process.env.SERVER_ERROR).send({
      message: 'Произошла ошибка на сервере',
    });
  });

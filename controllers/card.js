const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoAccessRightsError = require('../errors/NoAccessRightsError');
const NotValidationError = require('../errors/NotValidationError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      return card.owner.toString();
    })
    .then((cardUserId) => {
      if (!cardUserId) {
        throw new NotFoundError('Не найден пользователь, создавший карточку');
      } else if (cardUserId !== req.user._id) {
        throw new NoAccessRightsError('Пользователь может удалять только свои карточки');
      } else {
        return Card.findByIdAndRemove(cardId)
          .then((card) => {
            if (card) res.send({ data: card });
            else {
              throw new NotFoundError('Карточка не найдена');
            }
          });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new NotValidationError('Некорректный id карточки'));
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidationError('Некорректные данные карточки'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) res.send({ data: card });
    else {
      throw new NotFoundError('Карточка не найдена');
    }
  })
  .catch((err) => {
    if (err instanceof mongoose.CastError) {
      next(new NotValidationError('Некорректный id карточки'));
    }
    next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (card) res.send({ data: card });
  else {
    throw new NotFoundError('Карточка не найдена');
  }
})
  .catch((err) => {
    if (err instanceof mongoose.CastError) {
      next(new NotValidationError('Некорректный id карточки'));
    }
    next(err);
  });

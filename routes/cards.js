const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { regId, regLink } = require('../utils');

router.get('/', getAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(regId),
  }),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regLink),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(regId),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(regId),
  }),
}), dislikeCard);
module.exports = router;

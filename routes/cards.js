const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/\S+/),
  }),
}), createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
module.exports = router;

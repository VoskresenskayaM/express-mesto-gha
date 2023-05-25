const router = require('express').Router();
const {
  getAllCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCardById);
router.post('/', createCard);
router.patch('/:cardId/likes', likeCard);
router.patch('/:cardId/likes', dislikeCard);
module.exports = router;

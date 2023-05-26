const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const {
  getAllUsers, getUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', limiter, createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;

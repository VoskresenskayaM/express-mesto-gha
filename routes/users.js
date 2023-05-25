const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;

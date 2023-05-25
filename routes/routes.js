const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const mainRouter = require('./main');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', mainRouter);

module.exports = router;

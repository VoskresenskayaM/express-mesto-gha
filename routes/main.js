const router = require('express').Router();
const { getHello, notFound } = require('../controllers/main');

router.get('/', getHello);
router.patch('/*', notFound);
module.exports = router;

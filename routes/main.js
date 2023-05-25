const router = require('express').Router();
const { getHello } = require('../controllers/main');

router.get('/', getHello);
module.exports = router;

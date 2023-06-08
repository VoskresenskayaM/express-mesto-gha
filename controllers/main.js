const { notFound } = require('../utils');
const NotFoundError = require('../errors/NotFoundError');
module.exports.notFound = (req, res, next) => {
  return next(new NotFoundError('Страница не найдена'))
  res.status(notFound).send({ message: 'Страница не найдена' });
};

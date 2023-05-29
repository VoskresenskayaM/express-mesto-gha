const {  notFound } = require('../utils')
module.exports.notFound = (req, res) => {
  res.status(notFound).send({ message: 'Страница не найдена' });
};

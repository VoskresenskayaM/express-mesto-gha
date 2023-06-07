const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils');
const NoAccessRightsError = require('../errors/NoAccessRightsError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    /*throw new NoAccessRightsError('Необходима авторизация');*/
    return res
    .status(401)
    .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    /*throw new NoAccessRightsError('Необходима авторизация');*/
    return res
    .status(401)
    .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

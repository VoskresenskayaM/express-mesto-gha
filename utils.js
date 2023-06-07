const { PORT = 3000 } = process.env;
const { SECRET_KEY = 'my-secret-key' } = process.env;
const incorrectId = 400;
const notFound = 404;
const serverError = 500;
const incorrectUserPasswordOrEmail = 401;
const noRights = 403;
const incorrectEmail = 409;
const isExists = 11000;
module.exports = {
  incorrectId,
  notFound,
  serverError,
  incorrectUserPasswordOrEmail,
  noRights,
  incorrectEmail,
  isExists,
  PORT,
  SECRET_KEY,
};
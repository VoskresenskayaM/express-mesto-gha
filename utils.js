const { PORT = 3000 } = process.env;
const { SECRET_KEY = 'my-secret-key' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const ok = 200;
const incorrectId = 400;
const notFound = 404;
const serverError = 500;
const incorrectUserPasswordOrEmail = 401;
const noRights = 403;
const incorrectEmail = 409;
const isExists = 11000;
module.exports = {
  ok,
  incorrectId,
  notFound,
  serverError,
  incorrectUserPasswordOrEmail,
  noRights,
  incorrectEmail,
  isExists,
  PORT,
  SECRET_KEY,
  DB_ADDRESS,
};

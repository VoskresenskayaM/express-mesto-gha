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
const regAvatarLink = /https?:\/\/(w{3}\.)?[\w-_+&.?~:#@'*!()$;,[\]=/]+#?\.ru([a-zA-Z/])*/;
const regEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
const regPassword = /[0-9a-zA-Z!@#$%^&*]{6,20}/;
const regId = /^[\w]{24}$/;
const regLink = /https?:\/\/\S+/;
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
  regAvatarLink,
  regEmail,
  regPassword,
  regId,
  regLink,
};

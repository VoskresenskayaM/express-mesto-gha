const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const IncorrectDataUserError = require('../errors/IncorrectDataUserError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /* const reg = /https?\:\/\/[\w\-\.\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]\#?/g;
        return reg.test(v); */
        return validator.isURL(v);
      },
      message: 'Тут должна быть ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Тут должна электронная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        const reg = /[0-9]/;
        return reg.test(v);
      },
      message: 'Пароль должен содержать от 6 до 20 символов, в нем можно использовать цифры, символы и буквы латинского алфавита',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new IncorrectDataUserError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new IncorrectDataUserError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

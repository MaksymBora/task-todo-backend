import Joi from 'joi';
import { emailRegexp, passwordRegExp } from '../constans/userConstans.js';

const registration = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format should be - example@example.com',
  }),
  password: Joi.string().pattern(passwordRegExp).required().messages({
    'string.pattern.base':
      'Password should be at least 6 symbols and contain at least one capital letter, one lowercase letter, and one special character.',
  }),
});

const login = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email format should be - example@example.com',
  }),
  password: Joi.string().required().messages({
    'string.pattern.base':
      'Password should be at least 6 symbols and contain at least one capital letter, one lowercase letter, and one special character.',
  }),
});

const current = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
});

const update = Joi.object({
  name: Joi.string(),
});

const schema = {
  registration,
  login,
  update,
  current,
};

export default schema;

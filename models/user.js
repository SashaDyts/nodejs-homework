const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },

  avatarURL: { type: String },
  token: String,
});

userSchema.post('save', (err, data, next) => {
  err.status = 400;

  next();
});

const registerSchema = Joi.object({
  password: Joi.string()
    .messages({
      'string.empty': 'field must contain `password`',
      'string.min': 'password length must be at least 6 characters long',
      'any.required': 'missing required `password` field',
    })
    .min(6)
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'string.empty': 'field must contain `email`',
      'string.email': 'email is invalid',
      'any.required': 'missing required `email` field',
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .messages({
      'string.empty': 'field must contain `password`',
      'any.required': 'missing required `password` field',
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'string.empty': 'field must contain `email`',
      'any.required': 'missing required `email` field',
    })
    .required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscription,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};

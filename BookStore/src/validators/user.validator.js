import Joi from '@hapi/joi';
import logger from '../config/logger';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).required(),
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
    .message('Password must be 8 characters or more with at least one digit, one lowercase letter, one uppercase letter, and one special character')
    .required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits.',
      'string.empty': 'Phone number cannot be empty.',
      'any.required': 'Phone number is required.',
    })
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    logger.error(`error while creating user`)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next()
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
    .message('Password must be 8 characters or more with at least one digit, one lowercase letter, one uppercase letter, and one special character')
    .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next()
  }
};

import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).required(),
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
    .message('Password must be 8 characters or more with at least one digit, one lowercase letter, one uppercase letter, and one special character')
    .required(),
    phone: Joi.string().min(10).max(12).required(),
    role: Joi.string().required()
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

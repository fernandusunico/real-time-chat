const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required(),
    first_name: Joi.string().required(),
    avatar_path: Joi.string(),
  }),
};

module.exports = {
  register,
};

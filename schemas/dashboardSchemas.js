import Joi from 'joi';

const newDashBoard = Joi.object({
  boardTitle: Joi.string().required(),
  icon: Joi.string(),
  bgImage: Joi.string(),
});

export default newDashBoard;

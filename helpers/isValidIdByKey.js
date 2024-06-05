import { isValidObjectId } from 'mongoose';
import { HttpError } from './Error/HttpError.js';

const isValidIdbyKey = key => {
  return (req, res, next) => {
    const { [key]: id } = req.params;
    if (!isValidObjectId(id)) {
      next(HttpError(400, `Invalid search id: ${id}`));
    }
    next();
  };
};

export default isValidIdbyKey;

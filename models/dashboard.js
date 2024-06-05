import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/Error/handleMongooseError.js';

const newDashboard = new Schema({
  boardTitle: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    default: '',
  },
  bgImage: {
    type: String,
    default: 'noBack',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

newDashboard.post('save', handleMongooseError);

export const NewDashBoard = model('dashboard', newDashboard);

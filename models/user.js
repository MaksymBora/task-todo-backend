import { Schema, model } from 'mongoose';
import { emailRegexp, passwordMinLength } from '../constans/userConstans.js';
import { handleMongooseError } from '../helpers/Error/handleMongooseError.js';

// ----------- Schema for User Model -----------//

const userSchema = new Schema(
  {
    name: {
      // ---------------  Log In ------------------- //
      type: String,
      require: [true, 'Name is required'],
    },
    email: {
      type: String,
      require: [true, 'Email is required'],
      match: [emailRegexp, 'Invalid email format provided'],
      index: true,
      unique: [true, 'Email in use'],
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
      minLength: [
        passwordMinLength,
        `Password should be at least ${passwordMinLength} characres long`,
      ],
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  { timeseries: true, versionKey: false },
);

userSchema.post('save', handleMongooseError);

export const User = model('user', userSchema);

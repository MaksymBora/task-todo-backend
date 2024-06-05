import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { HttpError } from '../helpers/Error/HttpError.js';
import { NewDashBoard } from '../models/dashboard.js';

const { SECRET_KEY } = process.env;

// -------------- LogIn ---------------------------- //

const signUp = async body => {
  const { email, password } = body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user) throw HttpError(409, `Email "${email}" in use`);

  const hashPassword = await bcryptjs.hash(password, 10);

  await User.create({
    ...body,
    email: email.toLowerCase(),
    password: hashPassword,
  });

  const userFind = await User.findOne({ email });

  const payload = {
    id: userFind._id,
  };

  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '10 years' });

  await User.findByIdAndUpdate({ _id: userFind._id }, { token });

  return {
    ...body,
    email: email.toLowerCase(),
    password: hashPassword,
    token,
  };
};

// -------------- Log In -------------- //
const signIn = async body => {
  const userFind = await User.findOne({ email: body.email });

  if (!userFind) throw HttpError(403, 'Email or password is wrong');

  const comparePassword = await bcryptjs.compare(
    body.password,
    userFind.password,
  );

  if (!comparePassword) throw HttpError(403, 'Email or password is wrong');

  const payload = {
    id: userFind._id,
  };

  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '10 years' });

  await User.findByIdAndUpdate({ _id: userFind._id }, { token });

  const { name, email, avatarUrl } = userFind;

  const user = {
    name,
    email,
    avatarUrl,
    token,
  };

  return user;
};

// ----------------- Current user --------------- //

const currentUser = async userId => {
  const userFind = await User.findOne({ _id: userId });

  if (!userFind) throw HttpError(404, 'User not found');

  const { name, email, avatarUrl, token } = userFind;

  const user = {
    name,
    email,
    avatarUrl,
    token,
  };

  return user;
};

// ----------------- Current user --------------- //

const logout = async userId => {
  const user = await User.findByIdAndUpdate({ _id: userId }, { token: null });

  if (!user) throw HttpError(404, 'User not found');

  return;
};

const authServices = {
  signUp,
  signIn,
  logout,
  currentUser,
};

export default authServices;

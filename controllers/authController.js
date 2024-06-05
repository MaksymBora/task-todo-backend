import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import authServices from '../services/authServices.js';

// ---------------  Registration ------------------- //

const signUp = async (req, res) => {
  const newUser = await authServices.signUp(req.body);
  const { name, email, token } = newUser;

  res.status(201).json({
    status: 'successful',
    user: { name: name, email: email, token: token },
  });
};

// ---------------  Log In ------------------- //

const signIn = async (req, res) => {
  const user = await authServices.signIn(req.body);

  res.status(200).json({ user, status: 'Login successful' });
};

// ----------------- Current user --------------- //

const current = async (req, res) => {
  const user = await authServices.currentUser(req.user._id);

  res.status(200).json({ user });
};

// ---------------  Log Out ------------------- //

const signout = async (req, res) => {
  authServices.logout(req.user._id);

  res.status(204).json({ status: 'Logout successful' });
};

export default {
  signup: ctrlWrapper(signUp),
  signin: ctrlWrapper(signIn),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
};

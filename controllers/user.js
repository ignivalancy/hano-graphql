/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import { register, login, logout } from '../services/user';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
// import logger from '../utilities/logger';

export const registerUser = async (root, payload, context) => {
  try {
    return await register(payload);
  } catch (error) {
    failAction(error.message);
  }
};

export const loginUser = async (root, payload, context) => {
  try {
    return await login(payload);
  } catch (error) {
    failAction(error.message);
  }
};

export const logoutUser = async (root, payload, context) => {
  const { auth: { isAuthenticated, message } } = context;
  try {
    if (!isAuthenticated) throw new Error(message);
    const { auth: { credentials: { user, token } } } = context;
    await logout({ user, token });
    return Messages.logoutSuccessfull;
  } catch (error) {
    failAction(error.message);
  }
};

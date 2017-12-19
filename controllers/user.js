/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import { register, login, logout } from '../services/user';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';

export const registerUser = async (request, h) => {
  const { payload } = request;
  try {
    const data = await register(payload);
    return successAction(data, Messages.registerSuccess);
  } catch (error) {
    failAction(error.message);
  }
};

export const loginUser = async (request, h) => {
  const { payload } = request;
  try {
    const data = await login(payload);
    return successAction(data, Messages.loginSuccessfull);
  } catch (error) {
    failAction(error.message);
  }
};

export const logoutUser = async (request, h) => {
  const { auth: { credentials: { user, token } } } = request;
  try {
    await logout({ user, token });
    return successAction(null, Messages.logoutSuccessfull);
  } catch (error) {
    failAction(error.message);
  }
};

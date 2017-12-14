/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import { register, login, logout } from '../services/user';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';

export const registerUser = async (request, reply) => {
  const { payload } = request;
  try {
    const data = await register(payload);
    reply(successAction(data, Messages.registerSuccess));
  } catch (error) {
    reply(failAction(error.message));
  }
};

export const loginUser = async (request, reply) => {
  const { payload } = request;
  try {
    const data = await login(payload);
    reply(successAction(data, Messages.loginSuccessfull));
  } catch (error) {
    reply(failAction(error.message));
  }
};

export const logoutUser = async (request, reply) => {
  const { auth: { credentials: user, token } } = request;
  try {
    await logout({ user, token });
    reply(successAction(null, Messages.logoutSuccessfull));
  } catch (error) {
    reply(failAction(error.message));
  }
};

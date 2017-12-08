/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import { register } from '../services/user';
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

/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

import Boom from 'boom';
import User from '../collections/user';
import { decodeToken } from './universal';
import Messages from './messages';
import logger from './logger';

export const authentication = async (request, reply) => {
  // validate the request token
  const token = request.headers['x-logintoken'];
  try {
    const decoded = decodeToken(token);
    const user = await User.checkToken(token);
    logger.info('authentication', user);
    if (user) return reply({ user, token });
    else return reply(failAction(Messages.tokenExpired)).takeover();
  } catch (err) {
    return reply(failAction(Messages.tokenExpired)).takeover();
  }
};

export const successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data
});

export const failAction = errorMessage => Boom.badRequest(errorMessage);

export const failActionJoi = (request, reply, source, error) => {
  let errorMessage = '';
  if (error.output.payload.message.indexOf('[') > -1) {
    errorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
  } else {
    errorMessage = error.output.payload.message;
  }
  errorMessage = errorMessage.replace(/"/g, '');
  errorMessage = errorMessage.replace('[', '');
  errorMessage = errorMessage.replace(']', '');
  error.output.payload.message = errorMessage;
  delete error.output.payload.validation;
  return reply(Boom.badRequest(errorMessage));
};

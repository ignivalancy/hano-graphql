/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

import Boom from 'boom';
import User from '../collections/user';
import { decodeToken } from './universal';
import Messages from './messages';
import logger from './logger';

export const authorization = async (decoded, request, callback) => {
  const token = request.headers['authorization'];
  const user = await User.checkToken(token);
  logger.info('authorization', decoded);
  if (user) return callback(null, true, user);
  else return callback(null, false);
};

export const successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data: data ? data : undefined
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

/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

import Boom from 'boom';
import config from 'config';
import jwt from 'jsonwebtoken';
import User from '../collections/user';
import Messages from './messages';
import logger from './logger';

const { jwtKey } = config.get('app');

export const authContext = async request => {
  const token = request.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return { isAuthenticated: false, message: Messages.tokenExpired };
  }
  logger.info('authorization', decoded);
  const data = await User.checkToken(token);
  if (data) {
    const user = {
      _id: data._id,
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      loginToken: data.loginToken[data.loginToken.length - 1].token,
      lastLogin: data.lastLogin
    };
    return { isAuthenticated: true, credentials: { user, token }, message: Messages.tokenVerified };
  } else return { isAuthenticated: false, message: Messages.tokenExpired };
};

export const authorization = async (request, h) => {
  const token = request.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    throw Boom.unauthorized(Messages.tokenExpired);
  }
  logger.info('authorization', decoded);
  const user = await User.checkToken(token);
  if (user) return h.authenticated({ credentials: { user, token } });
  else throw Boom.unauthorized(Messages.tokenExpired);
};

export const successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data: data ? data : undefined
});

export const failAction = errorMessage => {
  throw Boom.badRequest(errorMessage);
};

export const failActionJoi = (request, h, error) => {
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
  throw Boom.badRequest(errorMessage);
};

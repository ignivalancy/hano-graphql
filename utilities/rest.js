/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

import Boom from 'boom';
// import logger from './logger';

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

export const successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data
});

export const failAction = errorMessage => Boom.badRequest(errorMessage);

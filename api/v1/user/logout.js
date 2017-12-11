import Joi from 'joi';
import { logoutUser } from '../../../controllers/user';
import { authentication, failActionJoi } from '../../../utilities/rest';

export default {
  method: 'DELETE',
  path: '/api/v1/user/logout',
  config: {
    description: 'Api service used for logging the user out of the application.',
    notes:
      'The request object should contain following fields in its <b>Headers</b> object<br/>&bull; <b>x-logintoken</b>: The token assigned to the user after successful login',
    tags: ['api', 'user'],
    pre: [{ method: authentication, assign: 'auth' }], // middleware to verify login token before proceeding
    validate: {
      headers: Joi.object({
        'x-logintoken': Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      failAction: failActionJoi
    }
  },
  handler: logoutUser
};

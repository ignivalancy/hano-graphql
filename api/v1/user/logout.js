import Joi from 'joi';
import { logoutUser } from '../../../controllers/user';
import { failActionJoi } from '../../../utilities/rest';

export default {
  method: 'DELETE',
  path: '/api/v1/user/logout',
  config: {
    auth: 'jwt',
    description: 'Api service used for logging the user out of the application.',
    notes:
      'The request object should contain following fields in its <b>Headers</b> object<br/>&bull; <b>x-logintoken</b>: The token assigned to the user after successful login',
    tags: ['api', 'user'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      failAction: failActionJoi
    }
  },
  handler: logoutUser
};

import Joi from 'joi';
import { loginUser } from '../../../controllers/user';
import { failActionJoi } from '../../../utilities/rest';

export default {
  method: 'POST',
  path: '/api/v1/user/login',
  config: {
    description: 'Api service used to login user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Email</b>: Should be a valid email or valid phone number (10 digit with max 4 digit country code). <br/>&bull;<b> Password</b>: Containing atleast one alphabet and one number, 6 - 8 characters.<br/>&bull;<b> Device Type</b>: Should contains type of device like ios,android. If type 2 then it is required otherwise not.<br/>&bull;<b> Device Token</b>: Should contains token of device. If type 2 then it is required otherwise not.<br/>&bull;<b> Type</b>: Should contains type of request like 1 for buisness user, 2 for app user, 3 for staff user and 4 for admin user.',
    tags: ['api', 'user'],
    validate: {
      payload: {
        uniqId: Joi.string()
          .trim()
          .lowercase()
          .required()
          .label('Uniq Id'),
        password: Joi.string()
          .trim()
          .regex(/^([a-zA-Z0-9_-]){6,8}$/)
          .options({
            language: {
              string: {
                regex: {
                  base: 'must be alphanumeric with 6 and 8 as min & max characters respectively'
                }
              }
            }
          })
          .required()
          .label('Password'),
        device: Joi.object()
          .keys({
            type: Joi.string()
              .trim()
              .required()
              .valid('ios', 'android')
              .label('Device Type'),
            token: Joi.string()
              .trim()
              .required()
              .label('Device Token')
          })
          .when('type', { is: 2, then: Joi.required(), otherwise: Joi.optional() })
          .label('Device Info'),
        type: Joi.number()
          .required()
          .valid(1, 2, 3) // 1 for business user, 2 for appUser, 3 for admin user
      },
      failAction: failActionJoi
    }
  },
  handler: loginUser
};

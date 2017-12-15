import Joi from 'joi';
import { registerUser } from '../../../controllers/user';
import { failActionJoi } from '../../../utilities/rest';

export default {
  method: 'POST',
  path: '/api/v1/user/register',
  config: {
    auth: false,
    description: 'Api service used to register a new user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>User Name</b>: Should carry the space saperated User name of the user. If type 1 then there will be only 30 characters. If type 2, then there will bee 20 characters and with only lowercase & uppercase alphabets,no numeric. This is a required field.<br/>&bull;<b> Email</b>: Should be a valid email.<br/>&bull;<b> Password</b>: Containing atleast one alphabet and one number, 6 - 8 characters.<br/>&bull;<b> Contact Number</b>: Accepts an object containing country code(+ character with max 4 digit only) and phone number(Should contain 10 digit only). If type 2 then it is required otherwise not.<br/>&bull;<b> Role</b>: Should contains user role like business,user,admin.<br/>&bull;<b> Device Type</b>: Should contains type of device like ios,android. If type 2 then it is required otherwise not.<br/>&bull;<b> Device Token</b>: Should contains token of device. If type 2 then it is required otherwise not.<br/>&bull;<b> Type</b>: Should contains type of request like 1 for web user and 2 for app user.',
    tags: ['api', 'user'],
    validate: {
      payload: {
        username: Joi.when('type', {
          is: 2,
          then: Joi.string()
            .trim()
            .required()
            .regex(/^([a-zA-Z_ ]){1,20}$/)
            .options({
              language: {
                string: {
                  regex: {
                    base:
                      'should be valid name with maximum 20 characters and with only lowercase & uppercase alphabets,no numeric.'
                  }
                }
              }
            }),
          otherwise: Joi.string()
            .trim()
            .optional()
            .min(1)
            .max(30)
        }).label('User Name'),
        email: Joi.string()
          .required()
          .email()
          .trim()
          .lowercase()
          .label('Email'),
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
        phone: Joi.object()
          .keys({
            code: Joi.string()
              .regex(/(\+\d{1,4})$/)
              .options({
                language: {
                  string: {
                    regex: {
                      base:
                        "should be valid, country code following a '+' character wih only 4 digit"
                    }
                  }
                }
              })
              .label('Country Code'),
            number: Joi.string()
              .regex(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/)
              .options({
                language: {
                  string: {
                    regex: { base: 'should be valid phone number of max 10 characters' }
                  }
                }
              })
              .label('Phone Number')
          })
          .when('type', { is: 2, then: Joi.required(), otherwise: Joi.optional() })
          .label('Contact Number'),
        role: Joi.string()
          .required()
          .trim()
          .label('Role')
          .valid('user', 'business', 'admin'),
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
          .valid(1, 2) // 1 for web and 2 for app
      },
      failAction: failActionJoi
    }
  },
  handler: registerUser
};

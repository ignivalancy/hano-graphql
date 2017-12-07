import * as User from '../../../handlers/user';

export default {
  method: 'GET',
  path: '/api/v1/user/register',
  handler: User.register
};

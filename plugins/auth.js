/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the auth plugin.
------------------------------------------------------------------------------------------------- */

import { authorization } from '../utilities/rest';

export default {
  name: 'Auth',
  version: '1.0.0',
  register: (server, options) => {
    const scheme = () => ({
      authenticate: authorization
    });
    server.auth.scheme('jwt', scheme);
    server.auth.strategy('jwt', 'jwt');
  }
};

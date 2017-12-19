/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the rest api's plugin.
------------------------------------------------------------------------------------------------- */

import api from '../api';

export default {
  name: 'Rest',
  version: '1.0.0',
  register: (server, options) => {
    server.route(api);
  }
};

/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the rest api's plugin.
------------------------------------------------------------------------------------------------- */

import api from '../api';

const Rest = {
  register: (server, options, next) => {
    const apiServer = server.select('api');
    apiServer.route(api);
    next();
  }
};

Rest.register.attributes = {
  name: 'Rest'
};

export default Rest;

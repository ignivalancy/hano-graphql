/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the rest api's plugin.
------------------------------------------------------------------------------------------------- */

import routes from '../api';

const Api = {
  register: (server, options, next) => {
    const apiServer = server.select('api');
    apiServer.route(routes);
    next();
  }
};

Api.register.attributes = {
  name: 'Api'
};

export default Api;

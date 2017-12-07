/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the custom plugIns according to the application need.
------------------------------------------------------------------------------------------------- */

import config from 'config';

const { name, host, port } = config.get('app');

const Main = {
  register: (server, options, next) => {
    server.route({
      method: 'GET',
      path: '/{p*}',
      handler: (request, reply) => {
        // return reply({
        //   name: name,
        //   endpoint: host,
        //   port: port
        // }).code(201);
        return reply.file('main.html');
      }
    });
    // call next() to signal hapi that your plugin has done the job.
    next();
  }
};

Main.register.attributes = {
  name: 'Main',
  version: '1.0.0'
};

export default Main;

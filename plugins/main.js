/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the custom plugIns according to the application need.
------------------------------------------------------------------------------------------------- */

import config from 'config';

const { name, host, port } = config.get('app');

const Main = {
  register: function(server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        return reply({
          name: name,
          endpoint: host,
          port: port
        }).code(201);
        // reply.file('views/index.html');
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

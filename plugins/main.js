/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the home page plugin.
------------------------------------------------------------------------------------------------- */

export default {
  name: 'Main',
  version: '1.0.0',
  register: (server, options) => {
    server.route({ path: '/{p*}', method: 'GET', handler: { file: './main.html' } });
  }
};

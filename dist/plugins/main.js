'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the home page plugin.
------------------------------------------------------------------------------------------------- */

exports.default = {
  name: 'Main',
  version: '1.0.0',
  register: function register(server, options) {
    server.route({ path: '/{p*}', method: 'GET', handler: { file: './main.html' } });
  }
};
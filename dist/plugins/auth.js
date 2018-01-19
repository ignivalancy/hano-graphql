'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rest = require('../utilities/rest');

exports.default = {
  name: 'Auth',
  version: '1.0.0',
  register: function register(server, options) {
    var scheme = function scheme() {
      return {
        authenticate: _rest.authorization
      };
    };
    server.auth.scheme('jwt', scheme);
    server.auth.strategy('jwt', 'jwt');
  }
}; /* ------------------------------------------------------------------------------------------------
      * @ description : Here we are creating the auth plugin.
   ------------------------------------------------------------------------------------------------- */
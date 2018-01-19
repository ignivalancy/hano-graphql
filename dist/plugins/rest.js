'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Rest',
  version: '1.0.0',
  register: function register(server, options) {
    server.route(_api2.default);
  }
}; /* ------------------------------------------------------------------------------------------------
      * @ description : Here we are creating the rest api's plugin.
   ------------------------------------------------------------------------------------------------- */
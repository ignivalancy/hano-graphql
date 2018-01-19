'use strict';

require('babel-polyfill');

require('babel-core/register');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creating REST API server connection.
/* ---------------------------------------------------------------------------------
   * @ description : This is the main startup server file to configure the application.
---------------------------------------------------------------------------------- */

(0, _server2.default)();

// create DB connection.
(0, _db2.default)();
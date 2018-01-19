'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./utilities/global');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _logger = require('./utilities/logger');

var _logger2 = _interopRequireDefault(_logger);

var _rest = require('./utilities/rest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* ---------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : This is the server configration file.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ---------------------------------------------------------------------------------- */

var app = _config2.default.get('app');

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var server;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          server = new _hapi2.default.Server({
            host: app.host,
            port: app.port,
            routes: {
              cors: {
                origin: ['*'],
                additionalHeaders: ['authorization'],
                additionalExposedHeaders: ['authorization']
              },
              validate: {
                failAction: _rest.failActionJoi
              }
            }
          });
          _context.next = 3;
          return server.register(_plugins2.default);

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return server.start();

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](3);

          _logger2.default.info('Error while starting server: ' + _context.t0.message);

        case 11:

          _logger2.default.info('+++ Server running at: ' + server.info.uri);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[3, 8]]);
}));
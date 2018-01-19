'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./utilities/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* ---------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : This is the db configration file.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ---------------------------------------------------------------------------------- */

// Connect to MongoDB
var db = _config2.default.get('db');

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var mongoUrl;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Build the connection string.
          mongoUrl = 'mongodb://' + db.host + ':' + db.port + '/' + db.name;


          _mongoose2.default.Promise = _bluebird2.default;

          _mongoose2.default.connect(mongoUrl, _config2.default.get('db.mongoose'), function (err) {
            if (err) {
              _logger2.default.error('+++ DB Error', err);
              // process.exit(1);
            } else {
              _logger2.default.info('+++ MongoDB Connected');
            }
          });

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));
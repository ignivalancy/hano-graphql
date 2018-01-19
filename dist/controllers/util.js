'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.downloadFile = undefined;

var _universal = require('../utilities/universal');

var _rest = require('../utilities/rest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* -----------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : This is the util controller layer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ----------------------------------------------------------------------- */

// import Messages from '../utilities/messages';
// import logger from '../utilities/logger';

var UPLOAD_PATH = 'assets/';
var fileOptions = { dest: UPLOAD_PATH, fileFilter: _universal.imageFilter };

var downloadFile = exports.downloadFile = {
  directory: {
    path: UPLOAD_PATH,
    redirectToSlash: false,
    index: false
  }
};

var uploadFile = exports.uploadFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, h) {
    var payload, file, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = request.payload;
            file = payload['file'];
            _context.prev = 2;
            _context.next = 5;
            return (0, _universal.uploader)(file, fileOptions);

          case 5:
            data = _context.sent;
            return _context.abrupt('return', (0, _rest.successAction)(data));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);

            (0, _rest.failAction)(_context.t0.message);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 9]]);
  }));

  return function uploadFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
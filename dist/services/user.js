'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../collections/user');

var _user2 = _interopRequireDefault(_user);

var _messages = require('../utilities/messages');

var _messages2 = _interopRequireDefault(_messages);

var _universal = require('../utilities/universal');

var Universal = _interopRequireWildcard(_universal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* -----------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : This is the user service layer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ----------------------------------------------------------------------- */

// import * as Mail from '../utilities/mail';
// import logger from '../utilities/logger';

var register = exports.register = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.checkEmail(payload.email);

          case 2:
            if (!_context.sent) {
              _context.next = 4;
              break;
            }

            throw new Error(_messages2.default.emailAlreadyExists);

          case 4:

            payload = _extends({}, payload, {
              password: Universal.encryptpassword(payload.password),
              verified: { token: Universal.generateRandom() }
            });

            _context.next = 7;
            return _user2.default.register(payload);

          case 7:
            data = _context.sent;
            return _context.abrupt('return', {
              _id: data._id,
              role: data.role,
              fullName: data.fullName,
              email: data.email
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();

var login = exports.login = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var userData, loginToken, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user2.default.login(payload.email, Universal.encryptpassword(payload.password));

          case 2:
            userData = _context2.sent;

            if (userData) {
              _context2.next = 5;
              break;
            }

            throw new Error(_messages2.default.invalidCredentials);

          case 5:
            // if (!userData.verified.status) throw new Error(Messages.userNotVerified);

            loginToken = Universal.generateToken({
              when: Universal.getTimeStamp(),
              role: userData.role,
              lastLogin: userData.lastLogin,
              userId: userData._id
            });
            _context2.next = 8;
            return _user2.default.onLoginDone(userData._id, payload, loginToken);

          case 8:
            data = _context2.sent;
            return _context2.abrupt('return', {
              _id: data._id,
              role: data.role,
              fullName: data.fullName,
              email: data.email,
              loginToken: data.loginToken[data.loginToken.length - 1].token,
              lastLogin: data.lastLogin
            });

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var logout = exports.logout = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payload) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user2.default.logout(payload.user._id, payload.token);

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function logout(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
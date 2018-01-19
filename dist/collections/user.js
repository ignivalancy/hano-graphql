'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* -----------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @ description : This file defines the user schema for mongodb.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ----------------------------------------------------------------------- */

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _universal = require('../utilities/universal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var UserClass = function () {
  function UserClass() {
    _classCallCheck(this, UserClass);
  }

  _createClass(UserClass, null, [{
    key: 'checkEmail',
    value: function checkEmail(email) {
      return this.findOne({ email: email });
    }
  }, {
    key: 'checkToken',
    value: function checkToken(token) {
      return this.findOne({ 'loginToken.token': token });
    }
  }, {
    key: 'register',
    value: function register(payload) {
      return this(payload).save();
    }
  }, {
    key: 'login',
    value: function login(email, password) {
      return this.findOne({
        email: email,
        password: password
      });
    }
  }, {
    key: 'onLoginDone',
    value: function onLoginDone(userId, payload, loginToken) {
      var updateData = {
        $push: { loginToken: { token: loginToken } },
        $set: {
          lastLogin: (0, _universal.getTimeStamp)(),
          updatedAt: (0, _universal.getTimeStamp)()
        }
      };

      return this.findByIdAndUpdate(userId, updateData, { new: true });
    }
  }, {
    key: 'logout',
    value: function logout(userId, token) {
      var updateData = {
        $set: {
          'device.token': '',
          updatedAt: (0, _universal.getTimeStamp)()
        },
        $pull: { loginToken: { token: token } }
      };
      return this.findByIdAndUpdate(userId, updateData);
    }
  }]);

  return UserClass;
}();

var UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' }, // business, user, admin
  verified: {
    token: { type: String, default: '' },
    status: { type: Boolean, default: false }
  },
  loginToken: [{
    token: { type: String, default: '' },
    when: { type: Number, default: _universal.getTimeStamp }
  }],
  lastLogin: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: _universal.getTimeStamp },
  updatedAt: { type: Number, default: _universal.getTimeStamp }
});

UserSchema.loadClass(UserClass);

exports.default = _mongoose2.default.model('User', UserSchema);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a logger instance
exports.default = new _bunyan2.default({
  name: _config2.default.get('app.name'),
  level: _config2.default.get('app.logLevel'),
  serializers: _bunyan2.default.stdSerializers
});
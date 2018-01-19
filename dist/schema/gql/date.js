'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.scalarType = exports.typeDefs = undefined;

var _language = require('graphql/language');

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

var typeDefs = exports.typeDefs = '\n\t\t\t\tscalar Date\n                ';

var scalarType = exports.scalarType = {
  description: 'Date custom scalar type',

  __parseValue: function __parseValue(value) {
    return new Date(value); // value from the client
  },
  __serialize: function __serialize(value) {
    if ((0, _isNumber2.default)(value)) {
      return value;
    } else {
      return value.getTime(); // value sent to the client
    }
  },
  __parseLiteral: function __parseLiteral(ast) {
    switch (ast.kind) {
      case _language.Kind.INT:
      case _language.Kind.FLOAT:
        return new Date(parseFloat(ast.value));
      default:
        return null;
    }
  }
};

var resolvers = exports.resolvers = {
  Date: scalarType
};
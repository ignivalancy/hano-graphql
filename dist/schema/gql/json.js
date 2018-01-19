'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.scalarType = exports.typeDefs = undefined;

var _language = require('graphql/language');

var typeDefs = exports.typeDefs = '\n                scalar JSON\n                '; /* eslint-disable */

var scalarType = exports.scalarType = {
  description: 'The `JSON` scalar type represents JSON values as specified by ' + '[ECMA-404](http://www.ecma-international.org/' + 'publications/files/ECMA-ST/ECMA-404.pdf).',

  __parseValue: function __parseValue(value) {
    return value; // value from the client
  },
  __serialize: function __serialize(value) {
    return value; // value sent to the client
  },
  __parseLiteral: function __parseLiteral(ast) {
    switch (ast.kind) {
      case _language.Kind.STRING:
      case _language.Kind.BOOLEAN:
        return ast.value;
      case _language.Kind.INT:
      case _language.Kind.FLOAT:
        return parseFloat(ast.value);
      case _language.Kind.OBJECT:
        {
          var value = Object.create(null);
          ast.fields.forEach(function (field) {
            value[field.name.value] = parseLiteral(field.value);
          });

          return value;
        }
      case _language.Kind.LIST:
        return ast.values.map(parseLiteral);
      default:
        return null;
    }
  }
};

var resolvers = exports.resolvers = {
  JSON: scalarType
};
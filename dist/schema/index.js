'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _graphqlSchemaModules = require('graphql-schema-modules');

var _date = require('./gql/date');

var date = _interopRequireWildcard(_date);

var _json = require('./gql/json');

var json = _interopRequireWildcard(_json);

var _hello = require('./gql/hello');

var hello = _interopRequireWildcard(_hello);

var _book = require('./gql/book');

var book = _interopRequireWildcard(_book);

var _indiecore = require('./gql/indiecore');

var indiecore = _interopRequireWildcard(_indiecore);

var _user = require('./gql/user');

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// **** Schema


// **** Custom Scalar
var _mergeModules = (0, _graphqlSchemaModules.mergeModules)([date, json, hello, book, indiecore, user]),
    typeDefs = _mergeModules.typeDefs,
    resolvers = _mergeModules.resolvers;

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });

exports.default = schema;
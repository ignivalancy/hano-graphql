'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _good = require('good');

var _good2 = _interopRequireDefault(_good);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _graphql = require('./graphql');

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Pack from '../package.json';
/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

var app = _config2.default.get('app');

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
exports.default = [
/* -----------------------
      Register inert
    ------------------------ */
{
  plugin: _inert2.default,
  options: {}
},

/* -----------------------
      Register vision
    ------------------------ */
{
  plugin: _vision2.default,
  options: {}
},

/* ------------------
      Register good
    ------------------ */

{
  plugin: _good2.default,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
},

/* ---------------------------
      Setting up the jwt auth.
    ---------------------------- */
{
  plugin: _auth2.default,
  options: {}
},

/* ---------------------------
      Restfull Api's.
    ---------------------------- */
{
  plugin: _rest2.default,
  options: {}
},

/* ---------------------------
      Init the index route.
    ---------------------------- */
{
  plugin: _main2.default,
  options: {}
},

/* ---------------------------
      Init the Graphql Server.
    ---------------------------- */
{
  plugin: _graphql2.default,
  options: {
    path: '/gql',
    graphiql: app.debug, // isDevelopment
    graphiqlOptions: {
      passHeader: "'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ3aGVuIjoxNTE0MjY5Mjk5NDEzLCJyb2xlIjoidXNlciIsImxhc3RMb2dpbiI6MTUxNDI2MDg1MDAwNiwidXNlcklkIjoiNWE0MWM5NTcyN2FmYjQwNmU3MzRlZTBiIiwiaWF0IjoxNTE0MjY5Mjk5LCJleHAiOjE1MjIwNDUyOTl9.VIyV8WcU_6E3cLW29913WkQk7xpoGkGCI4Qv8tmwsYwgMMCkWauROouo9KUZgBESmu74I9LhLSNU9hUGhm0DBg'"
    }
  }
}];
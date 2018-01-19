'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _apolloServerHapi = require('apollo-server-hapi');

var _apolloErrors = require('apollo-errors');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _graphql = require('graphql');

var _rest = require('../utilities/rest');

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _logger = require('../utilities/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* ------------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : Here we are creating the Graphql Plugin.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ------------------------------------------------------------------------------------------------- */

exports.default = {
  name: 'Graphql',
  version: '1.0.0',
  register: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(server, _ref) {
      var _ref$path = _ref.path,
          path = _ref$path === undefined ? '/graphql' : _ref$path,
          _ref$subscriptionsPat = _ref.subscriptionsPath,
          subscriptionsPath = _ref$subscriptionsPat === undefined ? '/subscriptions' : _ref$subscriptionsPat,
          _ref$graphiql = _ref.graphiql,
          graphiql = _ref$graphiql === undefined ? false : _ref$graphiql,
          _ref$graphiqlPath = _ref.graphiqlPath,
          graphiqlPath = _ref$graphiqlPath === undefined ? '/graphiql' : _ref$graphiqlPath,
          graphiqlOptions = _ref.graphiqlOptions;
      var subscriptionsEndpoint, plugins;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              subscriptionsEndpoint = 'ws://' + server.info.host + ':' + server.info.port + subscriptionsPath;
              plugins = [{
                plugin: _apolloServerHapi.graphqlHapi,
                options: {
                  path: path,
                  graphqlOptions: function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return (0, _rest.authContext)(request);

                            case 2:
                              _context.t0 = _context.sent;
                              _context.t1 = {
                                auth: _context.t0
                              };
                              _context.t2 = _schema2.default;
                              _context.t3 = _apolloErrors.formatError;
                              return _context.abrupt('return', {
                                context: _context.t1,
                                schema: _context.t2,
                                formatError: _context.t3
                              });

                            case 7:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, undefined);
                    }));

                    function graphqlOptions(_x3) {
                      return _ref3.apply(this, arguments);
                    }

                    return graphqlOptions;
                  }(),
                  route: {
                    cors: true
                  }
                }
              }];


              if (graphiql) plugins.push({
                plugin: _apolloServerHapi.graphiqlHapi,
                options: {
                  path: graphiqlPath,
                  graphiqlOptions: _extends({
                    endpointURL: path
                  }, graphiqlOptions, {
                    subscriptionsEndpoint: subscriptionsEndpoint
                  })
                }
              });

              // setup graphql server
              _context3.next = 5;
              return server.register(plugins);

            case 5:

              // setup subscription server
              _subscriptionsTransportWs.SubscriptionServer.create({
                execute: _graphql.execute,
                subscribe: _graphql.subscribe,
                schema: _schema2.default,
                onConnect: function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4, webSocket) {
                    var token = _ref4.token;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _logger2.default.info('+++ Subscription Connected');

                            // const userContext = authContext(token);

                            // if (userContext.isAuthenticated) {
                            //   return { ...userContext };
                            // }

                            // throw new Error(userContext.message);

                            return _context2.abrupt('return');

                          case 2:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, undefined);
                  }));

                  function onConnect(_x4, _x5) {
                    return _ref5.apply(this, arguments);
                  }

                  return onConnect;
                }(),
                onDisconnect: function onDisconnect(webSocket) {
                  _logger2.default.info('+++ Subscription Disconnected');
                  return;
                }
              }, {
                server: server.listener,
                path: subscriptionsPath
              });

              _logger2.default.info('+++ GraphQL running at: ' + server.info.uri + path);
              _logger2.default.info('+++ GraphQL Subscriptions running at: ' + subscriptionsEndpoint);
              _logger2.default.info('+++ GraphiQL running at: ' + server.info.uri + graphiqlPath);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function register(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return register;
  }()
};
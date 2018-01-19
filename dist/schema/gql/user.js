'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _graphqlSubscriptions = require('graphql-subscriptions');

var _user = require('../../controllers/user');

var _subscriptions = require('../../utilities/subscriptions');

var _subscriptions2 = _interopRequireDefault(_subscriptions);

var _logger = require('../../utilities/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SOMETHING_CHANGED_TOPIC = 'something_changed';

var typeDefs = exports.typeDefs = '\n                type User {\n                  # Description for field\n                  _id: String\n                  fullName: String\n                  email: String!\n                  role: String!\n                  loginToken: String\n                  lastLogin: String\n                }\n                type Query {\n                  me:User\n                }\n                type Mutation {\n                  registerUser(\n                    fullName: String!\n                    email: String!\n                    password: String!\n                    role: String!\n                  ): User\n                  loginUser(\n                    email: String!\n                    password: String!\n                  ): User\n                  logoutUser: String!\n                  newUser: String!\n                }\n                type Subscription {\n                  newUser: String\n                }\n                ';

var resolvers = exports.resolvers = {
  Query: {
    me: function me(root, payload, context) {
      if (context.auth.isAuthenticated) return context.auth.credentials.user;
      throw new Error(context.auth.message);
    }
  },
  Mutation: {
    registerUser: _user.registerUser,
    loginUser: _user.loginUser,
    logoutUser: _user.logoutUser,
    newUser: function newUser(root, payload, context) {
      _subscriptions2.default.publish(SOMETHING_CHANGED_TOPIC, { newUser: 'Dev' });
      return 'Dev';
    }
  },
  Subscription: {
    newUser: {
      // subscribe: () => pubsub.asyncIterator('something_changed'),
      // resolve: payload => {
      //   return payload.newUser;
      // },
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return _subscriptions2.default.asyncIterator(SOMETHING_CHANGED_TOPIC);
      }, function (root, args, context) {
        _logger2.default.info('newUser', context);
        return true;
      })
    }
  }
};
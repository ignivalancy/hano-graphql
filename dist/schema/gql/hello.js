"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = exports.typeDefs = "\n\t\t\t\t\ttype Query {\n\t\t\t\t\t  say (\n                \t\t\tsomething: String!\n              \t\t\t): String\n\t\t\t\t\t}";

var resolvers = exports.resolvers = {
  Query: {
    say: function say(root, _ref, context) {
      var something = _ref.something;

      return "hello " + something;
    }
  }
};
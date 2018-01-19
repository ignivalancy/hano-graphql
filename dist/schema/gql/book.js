'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _books = [{
  title: "Harry Potter and the Sorcerer's stone",
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];

// The GraphQL schema in string form
var typeDefs = exports.typeDefs = '\n  type Query { books: [Book] }\n  type Book { title: String, author: String }\n';

// The resolvers
var resolvers = exports.resolvers = {
  Query: { books: function books() {
      return _books;
    } }
};
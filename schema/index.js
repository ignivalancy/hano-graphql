import { makeExecutableSchema } from 'graphql-tools';
import { mergeModules, loadModules } from 'graphql-schema-modules';

// **** Custom Scalar
import * as date from './gql/date';
import * as json from './gql/json';
// **** Schema
import * as hello from './gql/hello';
import * as book from './gql/book';
import * as indiecore from './gql/indiecore';
// import * as user from './gql/user';

const { typeDefs, resolvers } = mergeModules([date, json, hello, book, indiecore]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

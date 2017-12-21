import { makeExecutableSchema } from 'graphql-tools';
import { mergeModules, loadModules } from 'graphql-schema-modules';

// **** Custom Scalar
import * as date from './gql/date';
import * as json from './gql/json';
// **** Schema
import * as hello from './gql/hello';
import * as book from './gql/book';
// import response from './gql/response';
// import categories from './gql/categories';
// import tasks from './gql/tasks';
// import indiecore from './gql/indiecore';
// import user from './gql/user';

const { typeDefs, resolvers } = mergeModules([date, json, hello, book]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

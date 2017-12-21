import { makeExecutableSchema } from 'graphql-tools';
import { loadSchema, getSchema } from 'graphql-loader';
import { mergeModules, loadModules } from 'graphql-schema-modules';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';

initAccounts();

// **** Custom Scalar
import date from './gql/date';
import json from './gql/json';
// **** Schema
import hello from './gql/hello';
import response from './gql/response';
import categories from './gql/categories';
import tasks from './gql/tasks';
import indiecore from './gql/indiecore';
import user from './gql/user';
const accounts = getSchema();

const { typeDefs, resolvers } = mergeModules([
  date,
  json,
  hello,
  response,
  user,
  accounts,
  categories,
  tasks,
  indiecore,
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

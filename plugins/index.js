/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import Inert from 'inert';
import Vision from 'vision';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import Good from 'good';
import Pack from '../package.json';
import Auth from './auth';
import Rest from './rest';
import Main from './main';
import schema from '../schema';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
export default [
  /* -----------------------
        Register inert
      ------------------------ */
  {
    plugin: Inert,
    options: {}
  },

  /* -----------------------
        Register vision
      ------------------------ */
  {
    plugin: Vision,
    options: {}
  },

  /* ------------------
        Register good
      ------------------ */

  {
    plugin: Good,
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  },

  /* ---------------------------
        Setting up the jwt authentication.
      ---------------------------- */
  {
    plugin: Auth,
    options: {}
  },

  /* ---------------------------
        Restfull Api's.
      ---------------------------- */
  {
    plugin: Rest,
    options: {}
  },

  /* ---------------------------
        Init the index route.
      ---------------------------- */
  {
    plugin: Main,
    options: {}
  },

  /* ---------------------------
        Init the Graphql Server.
      ---------------------------- */
  {
    plugin: graphqlHapi,
    options: {
      path: '/gql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  },

  /* ---------------------------
        Init the Graphiql.
      ---------------------------- */
  {
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/gql'
      }
    }
  }
];

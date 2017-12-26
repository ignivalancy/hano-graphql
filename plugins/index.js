/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import Inert from 'inert';
import Vision from 'vision';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { formatError } from 'apollo-errors';
import { authentication } from '../utilities/rest';
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
        Setting up the jwt auth.
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
      graphqlOptions: async request => ({
        context: { auth: await authentication(request) },
        schema,
        formatError
      }),
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
        endpointURL: '/gql',
        passHeader:
          "'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ3aGVuIjoxNTE0MjYwODUwMDA0LCJyb2xlIjoidXNlciIsInVzZXJJZCI6IjVhNDFjOTU3MjdhZmI0MDZlNzM0ZWUwYiIsImlhdCI6MTUxNDI2MDg1MCwiZXhwIjoxNTIyMDM2ODUwfQ.jCW6DWx79BSAJRHvMt8RjOdF4p5E9INUAkMeb5E8xjkW1GPs-7Kq3w5OW9sB9urGRmoAdPivAp9VHAN8NZnAQQ'"
      }
    }
  }
];

/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import Inert from 'inert';
import Vision from 'vision';
import Good from 'good';
import config from 'config';
// import Pack from '../package.json';
import Auth from './auth';
import Rest from './rest';
import Main from './main';
import Graphql from './graphql';

const app = config.get('app');

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
    plugin: Graphql,
    options: {
      path: '/gql',
      graphiql: app.debug, // isDevelopment
      graphiqlOptions: {
        passHeader:
          "'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ3aGVuIjoxNTE0MjY5Mjk5NDEzLCJyb2xlIjoidXNlciIsImxhc3RMb2dpbiI6MTUxNDI2MDg1MDAwNiwidXNlcklkIjoiNWE0MWM5NTcyN2FmYjQwNmU3MzRlZTBiIiwiaWF0IjoxNTE0MjY5Mjk5LCJleHAiOjE1MjIwNDUyOTl9.VIyV8WcU_6E3cLW29913WkQk7xpoGkGCI4Qv8tmwsYwgMMCkWauROouo9KUZgBESmu74I9LhLSNU9hUGhm0DBg'"
      }
    }
  }
];

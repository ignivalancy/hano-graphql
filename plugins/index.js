/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

// import Inert from 'inert';
// import Vision from 'vision';
// import HapiSwagger from 'hapi-swagger';
// import Good from 'good';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
// import Pack from '../package.json';
// import Auth from './auth';
// import Rest from './rest';
// import Main from './main';
import schema from './schema';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
export default [
  /* -----------------------
            Register inert
         ------------------------ */
  // {
  //   register: Inert,
  //   options: {}
  // },

  /* -----------------------
            Register vision
         ------------------------ */
  // {
  //   register: Vision,
  //   options: {}
  // },

  /* -----------------------
            Register Swagger
         ------------------------ */

  // {
  //   register: HapiSwagger,
  //   options: {
  //     info: {
  //       title: Pack.name,
  //       description: Pack.description,
  //       version: Pack.version
  //     },
  //     swaggerUI: false,
  //     documentationPath: '/api/docs',
  //     expanded: 'full',
  //     pathPrefixSize: 7,
  //     basePath: '/api/v1'
  //   }
  // },

  /* ------------------
            Register good
         ------------------ */

  // {
  //   register: Good,
  //   options: {
  //     ops: {
  //       interval: 1000
  //     },
  //     reporters: {
  //       myConsoleReporter: [
  //         {
  //           module: 'good-squeeze',
  //           name: 'Squeeze',
  //           args: [{ log: '*', response: '*' }]
  //         },
  //         {
  //           module: 'good-console'
  //         },
  //         'stdout'
  //       ]
  //     }
  //   }
  // },

  /* ---------------------------
            Setting up the jwt authentication.
        ---------------------------- */
  // {
  //   // register plugins to server instance.
  //   register: Auth,
  //   options: {}
  // },

  /* ---------------------------
            Restfull Api's.
        ---------------------------- */
  // {
  //   register: Rest,
  //   options: {}
  // },

  /* ---------------------------
            Init the index route.
        ---------------------------- */
  // {
  //   // register plugins to server instance.
  //   plugin: Main,
  //   options: {}
  // },

  /* ---------------------------
            Init the Graphql Server.
        ---------------------------- */
  {
    // register plugins to server instance.
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

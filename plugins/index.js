/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

// import Inert from 'inert';
// import Vision from 'vision';
// import HapiSwagger from 'hapi-swagger';
// import Good from 'good';
// import Pack from '../package.json';
// import Auth from './auth';
// import Rest from './rest';
import Main from './main';
// import Socket from './socket';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
export default [
  /* -----------------------
            Register inert
         ------------------------ */
  // {
  //   plugin: Inert,
  //   options: {}
  // },

  /* -----------------------
            Register vision
         ------------------------ */
  // {
  //   plugin: Vision,
  //   options: {}
  // },

  /* -----------------------
            Register Swagger
         ------------------------ */

  // {
  //   plugin: HapiSwagger,
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
  //   plugin: Good,
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
  //   plugin: Auth,
  //   options: {}
  // },

  /* ---------------------------
            Setting up the web-socket connection.
        ---------------------------- */
  // {
  //   // register plugins to server instance.
  //   plugin: Socket,
  //   options: {}
  // },

  /* ---------------------------
            Restfull Api's.
        ---------------------------- */
  // {
  //   plugin: Rest,
  //   options: {}
  // },

  /* ---------------------------
            Init the index route.
        ---------------------------- */
  {
    // register plugins to server instance.
    plugin: Main,
    options: {}
  }
];

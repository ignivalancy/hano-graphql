/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import Good from 'good';
import Pack from '../package.json';
import Rest from './rest';
import Main from './main';
import Socket from './socket';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
export default [
  /* -----------------------
            Register inert
         ------------------------ */
  {
    register: Inert,
    options: {}
  },

  /* -----------------------
            Register vision
         ------------------------ */
  {
    register: Vision,
    options: {}
  },

  /* -----------------------
            Register Swagger
         ------------------------ */

  {
    register: HapiSwagger,
    options: {
      info: {
        title: Pack.name,
        description: Pack.description,
        version: Pack.version
      },
      swaggerUI: false,
      documentationPath: '/api/docs',
      expanded: 'full',
      pathPrefixSize: 7,
      basePath: '/api/v1'
    }
  },

  /* ------------------
            Register good
         ------------------ */

  {
    register: Good,
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
            Setting up the web-socket connection.
        ---------------------------- */
  {
    // register plugins to server instance.
    register: Socket,
    options: {}
  },

  /* ---------------------------
            Restfull Api's.
        ---------------------------- */
  {
    register: Rest,
    options: {}
  },

  /* ---------------------------
            Init the index route.
        ---------------------------- */
  {
    // register plugins to server instance.
    register: Main,
    options: {}
  }
];

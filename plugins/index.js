/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import Inert from 'inert';
import Vision from 'vision';
import Swagger from 'hapi-swaggered';
import SwaggerUI from 'hapi-swaggered-ui';
import Good from 'good';
import Pack from '../package.json';
import Auth from './auth';
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

  /* -----------------------
        Register Swagger
      ------------------------ */

  {
    plugin: Swagger,
    options: {
      tags: {
        api: Pack.description
      },
      info: {
        title: Pack.name,
        description: Pack.description,
        version: Pack.version
      }
    }
  },

  /* -----------------------
        Register SwaggerUI
      ------------------------ */

  {
    plugin: SwaggerUI,
    options: {
      title: Pack.name,
      path: '/api/docs',
      authorization: {
        field: 'authorization',
        scope: 'header', // header works as well
        // valuePrefix: 'bearer '// prefix incase
        defaultValue: 'token',
        placeholder: 'Enter your authorization token here'
      },
      swaggerOptions: {
        docExpansion: 'list'
      }
    }
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
        Setting up the web-socket connection.
      ---------------------------- */
  {
    plugin: Socket,
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
  }
];

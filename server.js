/* ---------------------------------------------------------------------------------
   * @ description : This is the main startup server file to init the application.
---------------------------------------------------------------------------------- */

import Hapi from 'hapi';
import config from 'config';
import Mongoose from 'mongoose';
import Bluebird from 'bluebird';
import plugins from './plugins';
import api from './api';
import logger from './utilities/logger';

const app = config.get('app');
const server = new Hapi.Server();

// creating REST API server connection.

server.connection(
  {
    host: app.host,
    port: app.port,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['x-logintoken'],
        additionalExposedHeaders: ['x-logintoken']
      }
    },
    labels: ['api']
  },
  {
    timeout: {
      server: 50000
    }
  }
);

// creating SOCKET server connection.
server.connection({
  port: app.socket,
  labels: ['socket']
});

// configure all routes to server object.
server.route(api);

// register PlugIn's and Start the server.
server.register(plugins, function(err) {
  // something bad happened loading the plugin.
  if (err) {
    throw err;
  }
  // start server after all PlugIns registration.
  server.start(function(err) {
    if (err) {
      logger.error('+++ Error starting server', err);
      throw err;
    } else {
      logger.info('+++ SERVER STARTED');
    }
  });
});

// Connect to MongoDB
const db = config.get('db');
// Build the connection string.
const mongoUrl = 'mongodb://' + db.host + ':' + db.port + '/' + db.name;

Mongoose.Promise = Bluebird;
// create DB connection.
Mongoose.connect(mongoUrl, config.get('db.mongoose'), function(err) {
  if (err) {
    logger.error('+++ DB Error', err);

    // process.exit(1);
  } else {
    logger.info('+++ MongoDB Connected');
  }
});

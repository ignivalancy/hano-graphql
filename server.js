/* ---------------------------------------------------------------------------------
   * @ description : This is the main startup server file to init the application.
---------------------------------------------------------------------------------- */

import './utilities/global';
import Hapi from 'hapi';
import config from 'config';
import Mongoose from 'mongoose';
import Bluebird from 'bluebird';
import plugins from './plugins';
import logger from './utilities/logger';

const app = config.get('app');
// const server = new Hapi.Server();

// creating REST API server connection.

// server.connection(
//   {
//     host: app.host,
//     port: app.port,
//     routes: {
//       cors: {
//         origin: ['*'],
//         additionalHeaders: ['authorization'],
//         additionalExposedHeaders: ['authorization']
//       }
//     },
//     labels: ['web', 'api']
//   },
//   {
//     timeout: {
//       server: 50000
//     }
//   }
// );

// creating SOCKET server connection.
// server.connection({
//   port: app.socket,
//   labels: ['socket']
// });

// register Plugin's and Start the server.
async function StartServer() {
  const server = new Hapi.server({
    host: app.host,
    port: app.port
  });

  await server.register(plugins);

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
// Connect to MongoDB
const db = config.get('db');
// Build the connection string.
const mongoUrl = 'mongodb://' + db.host + ':' + db.port + '/' + db.name;

Mongoose.Promise = Bluebird;
// create DB connection.
Mongoose.connect(mongoUrl, config.get('db.mongoose'), err => {
  if (err) {
    logger.error('+++ DB Error', err);
    // process.exit(1);
  } else {
    logger.info('+++ MongoDB Connected');
  }
});

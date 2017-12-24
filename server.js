/* ---------------------------------------------------------------------------------
   * @ description : This is the server configration file.
---------------------------------------------------------------------------------- */

import './utilities/global';
import Hapi from 'hapi';
import config from 'config';
import plugins from './plugins';
import logger from './utilities/logger';
import { failActionJoi } from './utilities/rest';

const app = config.get('app');

export default async () => {
  const server = new Hapi.Server({
    host: app.host,
    port: app.port,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['authorization'],
        additionalExposedHeaders: ['authorization']
      },
      validate: {
        failAction: failActionJoi
      }
    }
  });

  await server.register(plugins);

  try {
    await server.start();
  } catch (err) {
    logger.info(`Error while starting server: ${err.message}`);
  }

  logger.info(`+++ Server running at: ${server.info.uri}`);
};

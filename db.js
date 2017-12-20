/* ---------------------------------------------------------------------------------
   * @ description : This is the db configration file.
---------------------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import Bluebird from 'bluebird';
import config from 'config';
import logger from './utilities/logger';

// Connect to MongoDB
const db = config.get('db');

export default async () => {
  // Build the connection string.
  const mongoUrl = 'mongodb://' + db.host + ':' + db.port + '/' + db.name;

  Mongoose.Promise = Bluebird;

  Mongoose.connect(mongoUrl, config.get('db.mongoose'), err => {
    if (err) {
      logger.error('+++ DB Error', err);
      // process.exit(1);
    } else {
      logger.info('+++ MongoDB Connected');
    }
  });
};

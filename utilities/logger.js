import Logger from 'bunyan';
import config from 'config';

// create a logger instance
export default new Logger({
  name: config.get('app.name'),
  level: config.get('app.logLevel'),
  serializers: Logger.stdSerializers
});

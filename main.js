/* ---------------------------------------------------------------------------------
   * @ description : This is the main startup server file to configure the application.
---------------------------------------------------------------------------------- */

import configureDatabase from './db';
import configureServer from './server';

// creating REST API server connection.
configureServer();

// create DB connection.
configureDatabase();

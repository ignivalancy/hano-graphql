/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the home page plugin.
------------------------------------------------------------------------------------------------- */

import fs from 'fs';
import path from 'path';

export default {
  name: 'Main',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/{p*}',
      handler: (request, h) => {
        const main = path.join(__dirname, '../main.html'),
          html = fs.readFileSync(path.resolve(main), 'UTF-8');
        return html;
      }
    });
  }
};

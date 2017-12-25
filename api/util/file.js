import { downloadFile } from '../../controllers/util';

export default {
  method: 'GET',
  path: '/api/util/file/{fileName}',
  config: {
    auth: false,
    description: 'Api service used to download file.',
    tags: ['api', 'util']
  },
  handler: downloadFile
};

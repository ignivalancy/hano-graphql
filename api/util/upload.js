import { uploadFile } from '../../controllers/util';

export default {
  method: 'POST',
  path: '/api/util/upload',
  config: {
    auth: false,
    description: 'Api service used to upload file.',
    tags: ['api', 'util'],
    payload: {
      output: 'stream',
      allow: 'multipart/form-data',
      maxBytes: 1e7
    }
  },
  handler: uploadFile
};

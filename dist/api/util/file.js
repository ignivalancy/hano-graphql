'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../../controllers/util');

exports.default = {
  method: 'GET',
  path: '/api/util/file/{fileName}',
  config: {
    auth: false,
    description: 'Api service used to download file.',
    tags: ['api', 'util']
  },
  handler: _util.downloadFile
};
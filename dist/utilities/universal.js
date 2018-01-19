'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploader = exports.imageFilter = exports.decodeToken = exports.generateToken = exports.generateRandom = exports.encryptpassword = exports.getTimeStamp = undefined;

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _slugify = require('slugify');

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTimeStamp = exports.getTimeStamp = function getTimeStamp() {
  return Date.now();
}; /* -----------------------------------------------------------------------
      * @ description : Here defines all universal functions.
   ----------------------------------------------------------------------- */

var encryptpassword = exports.encryptpassword = function encryptpassword(request) {
  return (0, _md2.default)(request);
};

var generateRandom = exports.generateRandom = function generateRandom() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var alphanumeric = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var data = '',
      keys = '';

  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }

  for (var i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }

  return data;
};

var generateToken = exports.generateToken = function generateToken(data) {
  return _jsonwebtoken2.default.sign(data, _config2.default.app.jwtKey, { algorithm: _config2.default.app.jwtAlgo, expiresIn: '90d' });
};

var decodeToken = exports.decodeToken = function decodeToken(token) {
  return _jsonwebtoken2.default.verify(token, _config2.default.app.jwtKey);
};

var imageFilter = exports.imageFilter = function imageFilter(fileName) {
  // accept image only
  if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
    return false;
  }

  return true;
};

var uploader = exports.uploader = function uploader(file, options) {
  if (!file) throw new Error('no file(s)');
  return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};

var _fileHandler = function _fileHandler(file, options) {
  if (!file) throw new Error('No file');

  if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
    throw new Error('Type not allowed');
  }

  var fileName = (0, _slugify2.default)(generateRandom(5) + '_' + file.hapi.filename);
  var originalName = file.hapi.filename;
  var path = '' + options.dest + fileName;
  var fileStream = _fs2.default.createWriteStream(path);

  return new Promise(function (resolve, reject) {
    file.on('error', function (err) {
      reject(err);
    });

    file.pipe(fileStream);

    file.on('end', function (err) {
      var fileDetails = {
        fileName: fileName,
        originalName: originalName,
        mimetype: file.hapi.headers['content-type'],
        size: _fs2.default.statSync(path).size
      };

      resolve(fileDetails);
    });
  });
};

var _filesHandler = function _filesHandler(files, options) {
  if (!files || !Array.isArray(files)) throw new Error('no files');

  var promises = files.map(function (x) {
    return _fileHandler(x, options);
  });
  return Promise.all(promises);
};
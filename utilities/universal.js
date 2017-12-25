/* -----------------------------------------------------------------------
   * @ description : Here defines all universal functions.
----------------------------------------------------------------------- */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from 'config';
import fs from 'fs';
import slugify from 'slugify';

export const getTimeStamp = () => {
  return Date.now();
};

export const encryptpassword = request => md5(request);

export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = '',
    keys = '';

  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }

  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }

  return data;
};

export const generateToken = data =>
  jwt.sign(data, config.app.jwtKey, { algorithm: config.app.jwtAlgo, expiresIn: '90d' });

export const decodeToken = token => jwt.verify(token, config.app.jwtKey);

export const imageFilter = fileName => {
  // accept image only
  if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
    return false;
  }

  return true;
};

export const uploader = (file, options) => {
  if (!file) throw new Error('no file(s)');
  return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};

const _fileHandler = function(file, options) {
  if (!file) throw new Error('No file');

  if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
    throw new Error('Type not allowed');
  }

  const fileName = slugify(`${generateRandom(5)}_${file.hapi.filename}`);
  const originalName = file.hapi.filename;
  const path = `${options.dest}${fileName}`;
  const fileStream = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    file.on('error', function(err) {
      reject(err);
    });

    file.pipe(fileStream);

    file.on('end', function(err) {
      const fileDetails = {
        fileName,
        originalName,
        mimetype: file.hapi.headers['content-type'],
        size: fs.statSync(path).size
      };

      resolve(fileDetails);
    });
  });
};

const _filesHandler = (files, options) => {
  if (!files || !Array.isArray(files)) throw new Error('no files');

  const promises = files.map(x => _fileHandler(x, options));
  return Promise.all(promises);
};

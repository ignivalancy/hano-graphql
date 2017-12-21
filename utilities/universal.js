/* -----------------------------------------------------------------------
   * @ description : Here defines all universal functions.
----------------------------------------------------------------------- */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from 'config';

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

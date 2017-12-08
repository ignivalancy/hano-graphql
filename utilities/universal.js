/* -----------------------------------------------------------------------
   * @ description : Here defines all universal functions.
----------------------------------------------------------------------- */

import md5 from 'md5';
// import jwt from 'jsonwebtoken';
// import path from 'path';
// import fs from 'fs';
// import _ from 'underscore';
// import util from 'util';
// import config from 'config';

export const encryptpassword = request => md5(request);

export const generateRandom = (length, alphanumeric = true) => {
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

export const send_email = () => {};

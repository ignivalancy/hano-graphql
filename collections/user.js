/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import Mongoose from 'mongoose';
import config from 'config';
import { getTimeStamp } from './utils';

const { jwtKey } = config.get('app');
const Schema = Mongoose.Schema;

class UserClass {
  static checkEmail(email) {
    return this.findOne({ email, isDeleted: false });
  }
  static checkNumber(number) {
    return this.findOne({ 'phone.number': number, isDeleted: false });
  }
  static checkPasswordToken(passwordToken) {
    return this.findOne({ passwordToken });
  }
  static checkPassword(userId, password) {
    return this.findOne({ $and: [{ _id: userId }, { password }] });
  }
  static requireLogin(token, role = 'user') {
    try {
      const decoded = jwt.verify(token, jwtKey);
      return this.findOne({ 'loginToken.token': token, role });
    } catch (err) {
      return err;
    }
  }
}

const UserSchema = new Schema({
  username: { type: String, default: '' },
  email: { type: String, required: true },
  password: { type: String, default: '' },
  phone: {
    code: { type: String, default: '' },
    number: { type: String, default: '' }
  },
  role: { type: String, required: true }, // business, user, admin
  otp: { type: Number, default: 0 },
  description: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false },
  logo: { type: String, default: '' },
  status: { type: Number, default: 0 }, // 0:pending, 1:active, 2:decline, 3:block
  verified: {
    token: { type: String, default: '' },
    status: { type: Boolean, default: false }
  },
  loginToken: {
    token: { type: String, default: '' },
    when: { type: Number, default: getTimeStamp }
  },
  device: {
    token: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  lastLogin: { type: Number, default: getTimeStamp },
  createdAt: { type: Number, default: getTimeStamp },
  updatedAt: { type: Number, default: getTimeStamp }
});

UserSchema.loadClass(UserClass);
const User = Mongoose.model('User', UserSchema);

export default User;

/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class UserClass {
  static checkUserName(username) {
    return this.findOne({ username, isDeleted: false });
  }
  static checkEmail(email) {
    return this.findOne({ email, isDeleted: false });
  }
  static checkNumber(phone) {
    return this.findOne({ 'phone.number': phone.number, isDeleted: false });
  }
  static checkToken(token) {
    return this.findOne({ 'loginToken.token': token, isDeleted: false });
  }
  static register(payload) {
    return this(payload).save();
  }
  static login(uniqId, password, type = 1) {
    const role = type == 1 ? 'business' : type == 2 ? 'user' : 'admin';
    return this.findOne({
      $or: [{ username: uniqId }, { email: uniqId }, { 'phone.number': uniqId }],
      password,
      role,
      isDeleted: false
    });
  }
  static onLoginDone(userId, payload, loginToken) {
    let updateData = {
      $set: {
        'device.type': payload.device ? payload.device.type : '',
        'device.token': payload.device ? payload.device.token : '',
        lastLogin: getTimeStamp(),
        updatedAt: getTimeStamp()
      }
    };

    if (payload.type == 2) {
      updateData = { $set: { ...updateData.$set, loginToken: [{ token: loginToken }] } };
    } else {
      updateData = { ...updateData, $push: { loginToken: { token: loginToken } } };
    }
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
  static logout(userId, token) {
    let updateData = {
      $set: {
        'device.token': '',
        updatedAt: getTimeStamp()
      },
      $pull: { loginToken: { token } }
    };
    return this.findByIdAndUpdate(userId, updateData);
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
  loginToken: [
    {
      token: { type: String, default: '' },
      when: { type: Number, default: getTimeStamp }
    }
  ],
  device: {
    token: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  lastLogin: { type: Number },
  createdAt: { type: Number, default: getTimeStamp },
  updatedAt: { type: Number, default: getTimeStamp }
});

UserSchema.loadClass(UserClass);
const User = Mongoose.model('User', UserSchema);

export default User;

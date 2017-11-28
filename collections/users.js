/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from './utils';

const Schema = Mongoose.Schema;

class User {
  // `fullName` becomes a virtual
  // get fullName() {
  //     return `${this.firstName} ${this.lastName}`;
  // }
  // set fullName(v) {
  //     const firstSpace = v.indexOf(' ');
  //     this.firstName = v.split(' ')[0];
  //     this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
  // }
  // `getFullName()` becomes a document method
  // getFullName() {
  //     return `${this.firstName} ${this.lastName}`;
  // }
  // `findByFullName()` becomes a static
  // static findByFullName(name) {
  //     const firstSpace = name.indexOf(' ');
  //     const firstName = name.split(' ')[0];
  //     const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
  //     return this.findOne({ firstName, lastName });
  // }
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
  is_deleted: { type: Boolean, default: false },
  logo: { type: String, default: '' },
  status: { type: Number, default: 0 }, // 0:pending, 1:active, 2:decline, 3:block
  verified: {
    token: { type: String, default: '' },
    status: { type: Boolean, default: false }
  },
  login_token: {
    token: { type: String, default: '' },
    when: { type: Number, default: getTimeStamp }
  },
  device: {
    token: { type: String, default: '' },
    type: { type: String, default: '' }
  },
  last_login: { type: Number, default: getTimeStamp },
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

UserSchema.loadClass(User);

export default Mongoose.model('user', UserSchema);

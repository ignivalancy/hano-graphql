/* -----------------------------------------------------------------------
   * @ description : This is the user handler which will handle the user CRUD.
----------------------------------------------------------------------- */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import _ from 'underscore';
import util from 'util';
import config from 'config';
import User from '../collections/user';
import logger from '../utilities/logger';

const resolveAfter5Seconds = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

export const register = async (request, reply) => {
  console.log(new Date());
  await resolveAfter5Seconds();
  console.log(new Date());
  return reply('register welcome');
};

// module.exports = {
//   /*********** register new user **********/
//   register: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           Utils.universalfunctions.check_email_exist(params.email, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res && res.length > 0) {
//               cb(Utils.responses.emailAlreadyExists);
//             } else {
//               cb(null, params);
//             }
//           });
//         },
//         function(params, cb) {
//           let phone =
//             params.hasOwnProperty('phone') && params.phone.number != ''
//               ? params.phone.number
//               : null;
//           Utils.universalfunctions.check_contact_exist(phone, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res && res.length > 0) {
//               cb(Utils.responses.contactAlreadyExists);
//             } else {
//               cb(null, params);
//             }
//           });
//         },
//         function(data, cb) {
//           delete data.type;
//           data.password = Utils.universalfunctions.encryptpassword(data.password);
//           data.device = { token: data.device_token, type: data.device_type };
//           /********** save user object to database **********/
//           Models.users(data).save(function(err, res) {
//             if (err) {
//               cb(err);
//             } else {
//               cb(null, res);
//             }
//           });
//         },
//         function(data, cb) {
//           let queryObj = { _id: data._id },
//             updateObj = {"verified.token": Utils.universalfunctions.generateRandomString(15,true)},
//             options = { upsert: false, new: true };
//           Models.users
//             .findOneAndUpdate(queryObj, updateObj, options)
//             .lean()
//             .exec(function(err, res) {
//               if (res) {
//                 cb(null, res);
//               } else {
//                 cb(err || Utils.responses.systemError);
//               }
//             });
//         },
//         function(data, cb) {
//           // send Verify Email.

//           let response,
//             username = data.username.capitalizeEachLetter(),
//             link= Configs.CONSTS.webUrl + 'account-verification/'+data.verified.token;

//           let templatepath = path.join(__dirname, '../emailTemplates/');
//           let emailTemplate = fs.readFileSync(
//             path.resolve(templatepath + 'verifyEmail.html'),
//             'UTF-8'
//           );
//           /******** Replace dynamic values in email template. ********/
//           let sendStr = util.format(emailTemplate, username, link);

//           /******** set email data object. ********/
//           let email_data = {
//             to: data.email,
//             from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//             subject: Utils.transporter.subjects.userVerification,
//             html: sendStr,
//           };
//           Utils.universalfunctions.send_email(email_data, function(err, res) {
//             if (err)
//               console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//             else
//               console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//           });

//           if (data.role == 'business') {
//             let emailTemplate = fs.readFileSync(
//               path.resolve(templatepath + 'newUserApproval.html'),
//               'UTF-8'
//             );
//             /******** Replace dynamic values in email template. ********/
//             let sendStr = util.format(emailTemplate, username, data.email);

//             /******** set email data object. ********/
//             let email_data = {
//               to: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//               from: data.email,
//               subject: Utils.transporter.subjects.newUserApproval,
//               html: sendStr,
//             };
//             /********* Send new user approval email to admin *********/
//             Utils.universalfunctions.send_email(email_data, function(err, res) {
//               if (err)
//                 console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//               else
//                 console.log(
//                   '-----@@----- Response at sending verify mail to user -----@@-----',
//                   res
//                 );
//             });

//             response = Utils.responses.registerSuccessfully;
//           } else {
//             response = Utils.responses.registerSuccess;
//             //response.result = {_id:data._id,role:data.role,first_name:data.first_name,last_name:data.last_name,email:data.email,phone:data.phone};
//           }
//           let result = {
//             response: response,
//           };
//           cb(null, result);
//         },
//       ],
//       callback
//     );
//   },
//   /*********** login new user **********/
//   login: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           /********** role paramater used in query to check the login credentials in database records only according to the user's role ***********/
//           let role = params.type == 1 ? 'business' : params.type == 2 ? 'user' : params.type == 3 ? 'staff' : 'admin';
//           //params.phone_code = params.hasOwnProperty('phone') && params.phone.code != '' ? params.phone.code : null;
//           //params.phone_number = params.hasOwnProperty('phone') && params.phone.number != '' ? params.phone.number : null;
//           params.email = params.hasOwnProperty('email') ? params.email : null;
//           let queryObj = {
//             $or: [{ email: params.email }, { 'phone.number': params.email }],
//             password: Utils.universalfunctions.encryptpassword(params.password),
//             is_deleted: false,
//             role: role,
//           };
//           Models.users.findOne(queryObj).exec(function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (!res) {
//               cb(Utils.responses.invalidCredentials);
//             } else {
//               Utils.universalfunctions.isUserActive(params.type, res, function(err) {
//                 if (err) {
//                   err.verify = res.verified.status;
//                   err.number = res.phone;
//                   cb(err);
//                 } else {
//                   cb(null, res);
//                 }
//               });
//             }
//           });
//         },
//         function(data, cb) {
//           params._id = data._id;
//           params.token = Utils.universalfunctions.generateRandomString(10, true);
//           let login_token = jwt.sign(params, Configs.CONSTS.jwtkey, {
//             algorithm: Configs.CONSTS.jwtAlgo,
//           });

//           let queryObj = { _id: data._id };
//           let updateObj;

//           if(params.type == 1){
//             updateObj = {$set:{
//                 'device.type': params.device_type ? params.device_type : '',
//                 'device.token': params.device_token ? params.device_token : '',
//                 updated_at: Utils.universalfunctions.getTimeStamp()
//               },
//               $push:{
//                 'login_token': {token:login_token},
//               }
//             }
//           }else{
//             updateObj = {
//               'login_token': [{token:login_token}],
//               'device.type': params.device_type ? params.device_type : '',
//               'device.token': params.device_token ? params.device_token : '',
//               updated_at: Utils.universalfunctions.getTimeStamp(),
//             }
//           }
//           let options = {
//               upsert: false,
//               new: true,
//             };

//           Models.users
//             .findOneAndUpdate(queryObj, updateObj, options)
//             .lean()
//             .exec(function(err, res) {
//               //console.log('----------- err,res -----------',err,res);
//               if (res) {
//                 let response = {};
//                 response._id = res._id;
//                 response.username = res.username;
//                 response.email = res.email;
//                 response.phone = res.phone;
//                 response.logo = res.logo;
//                 response.description = res.description;
//                 response.opening_hours = res.opening_hours;
//                 let result = {
//                   response: response,
//                   login_token: login_token,
//                 };
//                 cb(null, result);
//               } else {
//                 cb(err || Utils.responses.systemError);
//               }
//             });
//         },
//       ],
//       callback
//     );
//   },
//   /*********** add staff **********/
//   addStaff: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           Utils.universalfunctions.check_email_exist(params.email, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res && res.length > 0) {
//               cb(Utils.responses.emailAlreadyExists);
//             } else {
//               cb(null, params);
//             }
//           });
//         },
//         function(data, cb) {
//           /********** save user object to database **********/
//           data.role = 'staff';
//           data.status = 1;
//           Models.users(data).save(function(err, res) {
//             if (err) {
//               cb(err);
//             } else {
//               let queryObj = { _id: params.user._id },
//                 updateObj = {
//                   $push: {
//                     staff: {
//                       user_id: res._id,
//                       active: true,
//                       created_at: Utils.universalfunctions.getTimeStamp(),
//                     },
//                   },
//                 },
//                 options = { upsert: false };
//               Models.users
//                 .findOneAndUpdate(queryObj, updateObj, options)
//                 .lean()
//                 .exec(function(err, result) {
//                   if (result) {
//                     res.business_user = data.user;
//                     cb(null, res);
//                   } else {
//                     cb(err || Utils.responses.systemError);
//                   }
//                 });
//             }
//           });
//         },
//         function(data, cb) {
//           let tokenObj = { role: data.role, email: data.email, _id: data._id };
//           let token = jwt.sign(tokenObj, Configs.CONSTS.jwtkey, {
//             algorithm: Configs.CONSTS.jwtAlgo,
//           });
//           let link = Configs.CONSTS.webUrl + 'password/set/' + token;
//           Models.users
//             .findOneAndUpdate(
//               { _id: data._id },
//               { 'login_token': [{token:token}], updated_at: Utils.universalfunctions.getTimeStamp() },
//               { new: true, upsert: false }
//             )
//             .lean()
//             .exec(function(err, res) {
//               if (err) {
//                 cb(err);
//               } else {
//                 res._user = data.business_user;
//                 res.link = link;
//                 cb(null, res);
//               }
//             });
//         },
//         function(data, cb) {
//           let username = data.username.capitalizeEachLetter();
//           let templatepath = path.join(__dirname, '../emailTemplates/');
//           let emailTemplate = fs.readFileSync(
//             path.resolve(templatepath + 'newStaff.html'),
//             'UTF-8'
//           );
//           /******** Replace dynamic values in email template. ********/
//           let sendStr = util.format(emailTemplate, username, data._user.username.capitalizeEachLetter(), Configs.CONSTS.webUrl , data.email , data.link);

//           /******** set email data object. ********/
//           let email_data = {
//             to: data.email,
//             from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//             subject: Utils.transporter.subjects.newStaff,
//             html: sendStr,
//           };
//           /********* Send email to new staff to set the password *********/
//           Utils.universalfunctions.send_email(email_data, function(err, res) {
//             if (err)
//               console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//             else
//               console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//           });
//           let response = Utils.responses.staffAdded;
//           response._id = data._id;
//           cb(null, response);
//         },
//       ],
//       callback
//     );
//   },
//   /*********** get staff users **********/
//   getStaff: (params, callback) => {
//     let response = {};
//     params.user.staff = params.user.staff.reverse();//get the sorted staff user list
//     async.map(params.user.staff,function(obj,callbackInner){
//       let queryObj = {_id:obj.user_id,is_deleted:false,status:{$nin:[2,3]}};
//       if(params.query && params.query.name){
//         let search = ''+params.query.name+'',
//         regex = new RegExp(search,'i');
//         queryObj.username= {$regex:regex};
//       }
//       Models.users.findOne(queryObj,{_id:1,username:1,email:1,verified:1,status:1,created_at:1}).lean().exec(function(err,res){
//         if(err){
//           callbackInner(err);
//         } else if(res){
//           res = Utils.universalfunctions.jsonParseStringify(res);
//           let verify_status = res.verified.status;
//           let status = res.status;
//           delete res.verified;
//           delete res.status;
//           Models.sorties.find({staff_id:res._id},{title:1}).lean().sort({created_at: -1}).exec(function(err,records){
//             if(err){
//               callbackInner(err);
//             }else{
//               records = _.chain(records).pluck('title').value();
//               res.status = verify_status && status ? true : false;
//               res.assinedSorties = records;
//               callbackInner(null,res);
//             }
//           })
//         } else{
//           callbackInner(null,response);
//         }
//       });
//     },function(err,result){
//       if(err){
//         callback(err);
//       }else{
//         result = result.filter(value => Object.keys(value).length !== 0);
//         response.staff = result;
//         callback(null,response);
//       }
//     });
//   },
//   /*********** edit staff **********/
//   editStaff: (params, callback) => {
//     if(params.hasOwnProperty('email')){
//       async.waterfall(
//         [
//           function(cb) {
//             Utils.universalfunctions.check_email_exist(params.email, function(err, res) {
//               if (err) {
//                 cb(err);
//               } else if (res && res.length > 0) {
//                 cb(Utils.responses.emailAlreadyExists);
//               } else {
//                 cb(null, params);
//               }
//             });
//           },
//           function(params, cb) {
//             let queryObj = { _id: params.staff_id };
//             let token = Utils.universalfunctions.generateRandomString(15,true);
//             params.status = 1;
//             params.verified = {status:false,token:token};
//             params.updated_at = Utils.universalfunctions.getTimeStamp();
//             let options = { upsert: false };
//             Models.users
//               .findOneAndUpdate(queryObj, params, options)
//               .lean()
//               .exec(function(err, result) {
//                 if (result) {
//                   result.token = token;
//                   result.params = params;
//                   cb(null, result);
//                 } else {
//                   cb(err || Utils.responses.systemError);
//                 }
//             });
//           },
//           function(data, cb) {
//             let username = data.params.username.capitalizeEachLetter(); // staff username
//             let templatepath = path.join(__dirname, '../emailTemplates/');
//             let emailTemplate = fs.readFileSync(
//               path.resolve(templatepath + 'editStaff.html'),
//               'UTF-8'
//             );
//             let link= Configs.CONSTS.webUrl + 'account-verification/'+data.token;
//             /******** Replace dynamic values in email template. ********/
//             let sendStr = util.format(emailTemplate, username, data.params.user.username.capitalizeEachLetter(), Configs.CONSTS.webUrl , data.params.email, link);

//             /******** set email data object. ********/
//             let email_data = {
//               to: data.params.email,
//               from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//               subject: Utils.transporter.subjects.editStaff,
//               html: sendStr,
//             };
//             /********* Send email to new staff to set the password *********/
//             Utils.universalfunctions.send_email(email_data, function(err, res) {
//               if (err)
//                 console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//               else
//                 console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//             });
//             cb(null, Utils.responses.staffEdited);
//           },
//         ],callback
//       );
//     } else{
//       //delete params.user;
//       params.updated_at = Utils.universalfunctions.getTimeStamp();
//       Models.users.findOneAndUpdate({ _id: params.staff_id },params,{ new: true, upsert: false })
//             .lean()
//             .exec(function(err, res) {
//               if (err) {
//                 callback(err);
//               } else {
//                 callback(null, Utils.responses.staffEdited);
//               }
//             });
//     }
//   },
//   /*********** resend invite to staff users **********/
//   resendInviteToStaff: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb){
//           let queryObj = {email:params.email,role:'staff',is_deleted:false};
//           Utils.universalfunctions.is_email_exist(queryObj, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res) {
//               res.business_user = params.user;
//               cb(null, res);
//             } else {
//               cb(Utils.responses.emailnotExistForRole);
//             }
//           });
//         },
//         function(data, cb) {
//           let tokenObj = { role: data.role, email: data.email, _id: data._id };
//           let token = jwt.sign(tokenObj, Configs.CONSTS.jwtkey, {
//             algorithm: Configs.CONSTS.jwtAlgo,
//           });
//           let link = Configs.CONSTS.webUrl + 'password/set/' + token;
//           Models.users
//             .findOneAndUpdate(
//               { _id: data._id },
//               { 'login_token': [{token:token}], updated_at: Utils.universalfunctions.getTimeStamp() },
//               { new: true, upsert: false }
//             )
//             .lean()
//             .exec(function(err, res) {
//               if (err) {
//                 cb(err);
//               } else {
//                 res._user = data.business_user;
//                 res.link = link;
//                 cb(null, res);
//               }
//             });
//         },
//         function(data,cb){
//           let username = data.username.capitalizeEachLetter();
//           let templatepath = path.join(__dirname, '../emailTemplates/');
//           let emailTemplate = fs.readFileSync(
//             path.resolve(templatepath + 'newStaff.html'),
//             'UTF-8'
//           );
//           /******** Replace dynamic values in email template. ********/
//           let sendStr = util.format(emailTemplate, username, data._user.username.capitalizeEachLetter(), Configs.CONSTS.webUrl , data.email, data.link);

//           /******** set email data object. ********/
//           let email_data = {
//             to: data.email,
//             from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//             subject: Utils.transporter.subjects.newStaff,
//             html: sendStr,
//           };
//           /********* Send email to new staff to set the password *********/
//           Utils.universalfunctions.send_email(email_data, function(err, res) {
//             if (err)
//               console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//             else
//               console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//           });
//           cb(null, Utils.responses.resendInviteToStaff);
//         }
//       ],callback
//     );
//   },
//   /*********** logout user **********/
//   logout: (params, callback) => {
//     let queryObj = { _id: params._id,'login_token.token':params.token },
//       updateObj = {
//         $set:{
//           'device.token': '',
//           updated_at: Utils.universalfunctions.getTimeStamp(),
//         },
//        $pull: { 'login_token': {token:params.token} }
//       },
//       options = { new: true, upsert: false };

//     Models.users
//       .findOneAndUpdate(queryObj, updateObj, options)
//       .lean()
//       .exec(function(err, res) {
//         if (err) {
//           logger.errorLogger('Error while Logging out', err);
//           callback(err);
//         } else {
//           logger.successLogger('User logged out Successfully ', res);
//           callback(Utils.responses.logoutSuccessfull);
//         }
//       });
//   },
//   /*********** forget password (used for web user) **********/
//   forgetPassword: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           // check email exists
//           Utils.universalfunctions.check_email_exist(params.email, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res && res.length > 0) {
//               if (res[0].role == 'business' || res[0].role == 'staff') {
//                 Utils.universalfunctions.isUserActive(params.type, res[0], function(err) {
//                   if (err) {
//                     cb(err);
//                   } else {
//                     cb(null, res[0]);
//                   }
//                 });
//               } else {
//                 cb(Utils.responses.emailnotExistForRole);
//               }
//             } else {
//               cb(Utils.responses.emailNotExists);
//             }
//           });
//         },
//         function(data, cb) {
//           let tokenObj = { role: data.role, email: data.email, _id: data._id };
//           let token = jwt.sign(tokenObj, Configs.CONSTS.jwtkey, {
//             algorithm: Configs.CONSTS.jwtAlgo,
//           });
//           let link = Configs.CONSTS.webUrl + 'password/reset/' + token;
//           Models.users
//             .findOneAndUpdate(
//               { _id: data._id },
//               { 'login_token': [{token:token}], updated_at: Utils.universalfunctions.getTimeStamp() },
//               { new: true, upsert: false }
//             )
//             .lean()
//             .exec(function(err, res) {
//               if (err) {
//                 cb(err);
//               } else {
//                 res.link = link;
//                 cb(null, res);
//               }
//             });
//         },
//         function(data, cb) {
//           // send email to user for resetting the password
//           let username = data.username.capitalizeEachLetter();
//           let templatepath = path.join(__dirname, '../emailTemplates/');
//           let emailTemplate = fs.readFileSync(
//             path.resolve(templatepath + 'forgetPassword.html'),
//             'UTF-8'
//           );
//           /******** Replace dynamic values in email template. ********/
//           let sendStr = util.format(emailTemplate, username, data.link);

//           /******** set email data object. ********/
//           let email_data = {
//             to: data.email,
//             from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//             subject: Utils.transporter.subjects.forgetPassword,
//             html: sendStr,
//           };
//           /********* Send email to user to reset the password *********/
//           Utils.universalfunctions.send_email(email_data, function(err, res) {
//             if (err)
//               console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//             else
//               console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//           });

//           cb(null, Utils.responses.forgetPassword);
//         },
//       ],
//       callback
//     );
//   },
//   /*********** Reset password **********/
//   resetPassword: (params, callback) => {
//     params.password = Utils.universalfunctions.encryptpassword(params.password);
//     Models.users
//       .findOneAndUpdate(
//         { _id: params.user_id },
//         { password: params.password, "login_token":[],"verified.status":true,updated_at: Utils.universalfunctions.getTimeStamp()},
//         { new: true }
//       )
//       .exec(function(err, res) {
//         if (res) callback(null, Utils.responses.resetpassword);
//         else callback(err || Utils.responses.systemError);
//       });
//   },
//   /*********** send OTP **********/
//   sendOTP: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           Utils.universalfunctions.check_contact_exist(params.phone.number, function(err, res) {
//             if (err) {
//               cb(err);
//             } else if (res && res.length > 0) {
//               cb(null, res[0]);
//             } else {
//               cb(Utils.responses.phoneNumberNotExists);
//             }
//           });
//         },
//         function(data, cb) {
//           // update the phone number verification code in DB.

//           let otp = Utils.universalfunctions.generateRandomString(4);
//           let tokenObj = { role: data.role, email: data.email, _id: data._id };
//           let token = jwt.sign(tokenObj, Configs.CONSTS.jwtkey, {
//             algorithm: Configs.CONSTS.jwtAlgo,
//           });

//           Models.users
//             .findOneAndUpdate(
//               { _id: data._id },
//               {
//                 otp: otp,
//                 'login_token': [{token:token}],
//                 updated_at: Utils.universalfunctions.getTimeStamp(),
//               },
//               { new: true }
//             )
//             .exec(function(err, res) {
//               if (res) cb(null, res);
//               else cb(err || Utils.responses.systemError);
//             });
//         },
//         function(data, cb) {
//           // send OTP SMS.

//           let msg_data = {
//             message: Utils.messages.Otp.sendOTP(data.otp),
//             phone: data.phone.code + data.phone.number,
//           };

//           Utils.universalfunctions.sendSMS(msg_data, function(err, res) {
//             if (err) {
//               cb(err);
//             } else {
//               let result = {
//                 response: Utils.responses.sendOTP,
//                 login_token: data.login_token[0].token,
//               };
//               cb(null, result);
//             }
//           });
//         },
//       ],
//       callback
//     );
//   },
//   /*********** Verify OTP **********/
//   verifyOTP: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           // match verification code

//           Models.users.findOne({ 'phone.number': params.user.phone.number }, (err, res) => {
//             if (err) cb(err || Utils.responses.systemError);
//             else if (res) {
//               if (res.otp === params.otp) {
//                 let updateObj = {
//                   "verified.status": true,
//                   status: 1,
//                   otp: 0,
//                   updated_at: Utils.universalfunctions.getTimeStamp(),
//                 };
//                 params.updateObj = updateObj;
//                 cb(null, params);
//               } else cb(Utils.responses.otpNotValid, null);
//             } else cb(Utils.responses.phoneNumberNotExists);
//           });
//         },
//         function(data, cb) {
//           // Update user record as verified.
//           let queryObj = { _id: params.user._id },
//             options = { upsert: false, new: true };
//           Models.users
//             .findOneAndUpdate(queryObj, params.updateObj, options)
//             .lean()
//             .exec(function(err, res) {
//               if (res) {
//                 let response = {};
//                 response._id = res._id;
//                 response.username = res.username;
//                 response.email = res.email;
//                 response.phone = res.phone;
//                 let result = {
//                   response: response,
//                   login_token: res.login_token[0].token,
//                 };
//                 cb(null, result);
//               } else {
//                 cb(err || Utils.responses.systemError);
//               }
//             });
//         },
//       ],
//       callback
//     );
//   },
//   /*********** Change Password **********/
//   changePassword: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           // check the both old and new passwords are same or not.
//           if (params.oldPassword === params.newPassword)
//             cb(Utils.responses.oldAndNewPasswordMatch, null);
//           else cb(null, params);
//         },
//         function(data, cb) {
//           // check the Old Password is valid or not.
//           let encriptOldPass = Utils.universalfunctions.encryptpassword(params.oldPassword);
//           if (encriptOldPass === params.user.password) cb(null, data);
//           else cb(Utils.responses.oldPassIncorrect, null);
//         },
//         function(data, cb) {
//           // Update user new Password.

//           let encriptNewPass = Utils.universalfunctions.encryptpassword(params.newPassword);

//           let queryObj = { _id: params.user._id },
//             updateObj = {
//               password: encriptNewPass,
//               updated_at: Utils.universalfunctions.getTimeStamp(),
//             },
//             options = { upsert: false, new: true };

//           Models.users
//             .findOneAndUpdate(queryObj, updateObj, options)
//             .lean()
//             .exec(function(err, res) {
//               if (res) {
//                 cb(null, Utils.responses.passwordUpdated);
//               } else {
//                 cb(err || Utils.responses.systemError);
//               }
//             });
//         },
//       ],
//       callback
//     );
//   },
//   /*********** Get list of users who have Sortie application **********/
//   getContactsList: (params, callback) => {
//     // checking the user device contacts exists in database.
//     params.contact_numbers = _.uniq(params.contact_numbers); //getting unique array of numbers
//     async.map(params.contact_numbers,function(number,cb){
//       let queryObj = {
//         'phone.number': {$regex:number},
//         is_deleted: false,
//         "verified.status": true,
//         status: 1,
//       },
//       getObj = { _id: 1, username: 1, logo: 1, phone: 1 };

//       Models.users.findOne(queryObj, getObj).exec(function(err, res) {
//         if (err) {
//           cb(err || Utils.responses.systemError);
//         } else if(null != res){
//           cb(null, res);
//         } else{
//           cb(null, {});
//         }
//       });

//     },function(err,result){
//       if(err){
//         callback(err);
//       }else{
//         result = result.filter(value => Object.keys(value).length !== 0);
//         if(params.type == 1){
//           callback(null,result);
//         }else{
//           let sortie_users = _.chain(result).pluck("phone").pluck("number").value();
//           let non_sortie_users = _.difference(params.contact_numbers,sortie_users);
//           callback(null,non_sortie_users);
//         }
//       }
//     });
//   },
//   /*********** Verify new user email  **********/
//   verifyEmail: (params, callback) => {
//     // checking the token exists in database.
//       let queryObj = {
//         is_deleted: false,
//         "verified.token": params.token
//       },
//       updateObj = {'verified.token': "",'verified.status':true},
//       options = {upsert: false,new: true};
//       Models.users.findOneAndUpdate(queryObj,updateObj,options).exec(function(err, res) {
//         if (err) {
//           callback(err || Utils.responses.systemError);
//         } else if(res){
//            callback(null, Utils.responses.verifyTokenSuccess);
//         } else{
//           callback(Utils.responses.verifyTokenExpired);
//         }
//       });
//   },
//   /*********** Update user profile information  **********/
//   updateProfile: (params, callback) => {
//     async.waterfall(
//       [
//         function(cb) {
//           if(params.hasOwnProperty('email')){
//             Utils.universalfunctions.check_email_exist(params.email, function(err, res) {
//               if (err) {
//                 cb(err);
//               } else if (res && res.length > 0) {
//                 cb(Utils.responses.emailAlreadyExists);
//               } else {
//                 cb(null, params);
//               }
//             });
//           }else{
//             cb(null, params);
//           }
//         },
//         function(params,cb) {
//             let queryObj = {
//               _id:params.user._id
//             };
//             let updateObj = params;
//             if(params.hasOwnProperty('email')){
//               updateObj.verified = {token: Utils.universalfunctions.generateRandomString(15,true),status:true};
//             }
//             let options = {upsert: false,new: true};
//             Models.users.findOneAndUpdate(queryObj,updateObj,options).exec(function(err, result) {
//               if (result) {
//                 if(params.hasOwnProperty('email')){
//                   // Send Verify Email to new email update by user.
//                   let response,
//                     username = result.username.capitalizeEachLetter(),
//                     link= Configs.CONSTS.webUrl + 'account-verification/'+result.verified.token;

//                   let templatepath = path.join(__dirname, '../emailTemplates/');
//                   let emailTemplate = fs.readFileSync(
//                     path.resolve(templatepath + 'verifyEmail.html'),
//                     'UTF-8'
//                   );
//                   /******** Replace dynamic values in email template. ********/
//                   let sendStr = util.format(emailTemplate, username, link);

//                   /******** set email data object. ********/
//                   let email_data = {
//                     to: result.email,
//                     from: '"Sortie Admin " <' + Configs.CONSTS.ADMIN_EMIAL + '>',
//                     subject: Utils.transporter.subjects.userVerification,
//                     html: sendStr,
//                   };
//                   Utils.universalfunctions.send_email(email_data, function(err, res) {
//                     if (err)
//                       console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
//                     else
//                       console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
//                   });
//                   cb(null, Utils.responses.STATUS_MSG.SUCCESS.UPDATED);
//                 }else{
//                   cb(null, Utils.responses.STATUS_MSG.SUCCESS.UPDATED);
//                 }
//               } else{
//                 cb(err || Utils.responses.systemError);
//               }
//             });
//         },
//       ],callback
//     );

//   },
// };

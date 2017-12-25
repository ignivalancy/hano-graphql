/* -----------------------------------------------------------------------
   * @ description : This is the user service layer.
----------------------------------------------------------------------- */

import User from '../collections/user';
import Messages from '../utilities/messages';
import * as Universal from '../utilities/universal';
// import * as Mail from '../utilities/mail';
// import logger from '../utilities/logger';

export const register = async payload => {
  if (await User.checkEmail(payload.email)) throw new Error(Messages.emailAlreadyExists);

  payload = {
    ...payload,
    password: Universal.encryptpassword(payload.password),
    verified: { token: Universal.generateRandom() }
  };

  const data = await User.register(payload);

  // const username = data.fullName.capitalizeEachLetter(),
  //   link = `account-verification/${data.verified.token}`;

  // const sendStr = Mail.formatHTML({ fileName: 'verifyEmail.html', fullName, link });

  // const emailData = {
  //   to: data.email,
  //   subject: Mail.subjects.userVerification,
  //   html: sendStr
  // };

  // Mail.sendMail(emailData, function(err, res) {
  //   if (err) logger.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
  //   else logger.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
  // });

  return {
    _id: data._id,
    role: data.role,
    fullName: data.fullName,
    email: data.email
  };
};

export const login = async payload => {
  const userData = await User.login(payload.email, Universal.encryptpassword(payload.password));
  if (!userData) throw new Error(Messages.invalidCredentials);
  // if (!userData.verified.status) throw new Error(Messages.userNotVerified);

  let loginToken = Universal.generateToken({
    when: Universal.getTimeStamp(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });

  const data = await User.onLoginDone(userData._id, payload, loginToken);

  return {
    _id: data._id,
    role: data.role,
    fullName: data.fullName,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin
  };
};

export const logout = async payload => {
  return await User.logout(payload.user._id, payload.token);
};

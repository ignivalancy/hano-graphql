/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import path from 'path';
import util from 'util';
import config from 'config';
import logger from './logger';

const { smtpUser, smtpPass, smtpPort, smtpServer, mailFrom } = config.get('smtp');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: smtpServer, // hostname
    port: smtpPort, // port for secure SMTP
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })
);

export const subjects = {
  userVerification: 'Verify Email',
  forgetPassword: 'Forget Password'
};

export const formatHTML = request => {
  const templatepath = path.join(__dirname, '../emailTemplates/'),
    emailTemplate = fs.readFileSync(path.resolve(`${templatepath}${request.fileName}`), 'UTF-8');

  /******** Replace dynamic values in email template. ********/
  return util.format(emailTemplate, request.username, request.link);
};

export const sendMail = (request, cb) => {
  let options = {
    from: mailFrom,
    to: request.to, // list of receivers
    subject: request.subject, // Subject line
    // text: '', // plaintext body
    html: request.html // html body
    // replyTo: ""
  };

  if (request.cc) {
    options.cc = request.cc;
  }
  if (request.replyTo) {
    options.replyTo = request.replyTo;
  }

  transporter.sendMail(options, function(error, info) {
    // send mail with defined transport object
    logger.info(error, info);
    cb(error, info);
  });
};

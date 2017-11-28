/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from 'config';

const { smtp_user, smtp_pass, smtp_port, smtpServer } = config.get('smtp');

export default nodemailer.createTransport(
  smtpTransport({
    host: smtpServer, // hostname
    port: smtp_port, // port for secure SMTP
    auth: {
      user: smtp_user,
      pass: smtp_pass
    }
  })
);

export const subjects = {
  userVerification: 'Sortie - Verify Email',
  newUserApproval: 'Sortie - New User Approval',
  newStaff: 'Sortie - Staff User',
  forgetPassword: 'Sortie - Forget Password',
  contactUs: 'Sortie - Contact Us'
};

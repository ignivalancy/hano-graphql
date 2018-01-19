'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = exports.formatHTML = exports.subjects = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$get = _config2.default.get('smtp'),
    smtpUser = _config$get.smtpUser,
    smtpPass = _config$get.smtpPass,
    smtpPort = _config$get.smtpPort,
    smtpServer = _config$get.smtpServer,
    mailFrom = _config$get.mailFrom; /* -----------------------------------------------------------------------
                                        * @ description : Here initialising nodemailer transport for sending mails.
                                     ----------------------------------------------------------------------- */

var transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
  host: smtpServer, // hostname
  port: smtpPort, // port for secure SMTP
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
}));

var subjects = exports.subjects = {
  userVerification: 'Verify Email',
  forgetPassword: 'Forget Password'
};

var formatHTML = exports.formatHTML = function formatHTML(request) {
  var templatepath = _path2.default.join(__dirname, '../emailTemplates/'),
      emailTemplate = _fs2.default.readFileSync(_path2.default.resolve('' + templatepath + request.fileName), 'UTF-8');

  /******** Replace dynamic values in email template. ********/
  return _util2.default.format(emailTemplate, request.username, request.link);
};

var sendMail = exports.sendMail = function sendMail(request, cb) {
  var options = {
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

  transporter.sendMail(options, function (error, info) {
    // send mail with defined transport object
    _logger2.default.info(error, info);
    cb(error, info);
  });
};
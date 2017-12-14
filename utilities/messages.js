/* -----------------------------------------------------------------------
   * @ description : Main module to include all the messages used in project.
----------------------------------------------------------------------- */

export default {
  accept: 'Accepted',
  confirm: 'Confirmed',
  say: function(text) {
    return `Hello ${text}`;
  },
  systemError: 'Technical error ! Please try again later.',
  userNameAlreadyExists: 'This Username is already registered.',
  emailAlreadyExists: 'This Email is already registered.',
  contactAlreadyExists: 'This contact number is already registered.',
  emailNotExists: 'Email is not registered with us.',
  phoneNumberNotExists: 'Phone Number not registered.',
  registerSuccess: 'Your account has been registered successfully.',
  tokenExpired: 'Session Expired.',
  tokenVerified: 'Token has been verified',
  sendOTP: 'A verification code has been sent to your Contact number.',
  forgetPassword:
    'We have sent you an email on your registered email account to reset your password.',
  resetpassword: 'Your password has been reset successfully!',
  passwordUpdated:
    'Your password has been successfully changed. Please login with new password to continue. Thanks!.',
  emailChanged: 'An OTP is sent to the registered email Id. Please use that to verify your email.',
  phoneNumChanged:
    'An OTP is sent to the registered phone number. Please use that to verify your phone number.',
  emailUpdated: 'Email updated successfully.',
  loginSuccessfull: 'Logged in successfully.',
  logoutSuccessfull: 'Logged out successfully.',
  invalidCredentials: 'Invalid credentials.',
  accountNotConfirmed:
    'Your account is not confirmed.Please confirm verification link sent your registered email.',
  profileUpdate: 'Profile successfully updated.',
  unauthorizedUser: 'You are not an authorized user for this action.',
  forgetPasswordEmail:
    'An OTP is sent to the registered email Id. Please use that OTP to access your account.',
  contactUs: 'Your message has been sent successfully to admin.',
  otpVerified: 'OTP verified successfully.',
  userAuthenticated: 'User authenticated successfully.',
  userNotVerified: 'You haven\'t verify your account. Please verify to proceed.',
  userBlocked: 'Your account has been blocked by Admin. Please contact admin for further queries.',
  verifyTokenSuccess: 'Your email has been successfully verified.',
  verifyTokenExpired: 'Token has been expired.'
};

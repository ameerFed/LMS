export const BASE_URL = "https://egwb.logoinnovators.com/api/v1/";

export const API_END_POINTS = {
  login: BASE_URL + "auth/login",
  signup: BASE_URL + "student/signup",
  organizationSubmit: BASE_URL + "organization/submit",
  signupConfirmation: BASE_URL + "auth/verify-otp",
  resendOTP: BASE_URL + "auth/resend-otp",
  emailForgotPassword: BASE_URL + "auth/request-reset",
  resetPassword: BASE_URL + "auth/reset",

  // global Data 
  fieldOfStudy: BASE_URL + "common/field-of-study",
  

  // student 
  studentAddEducation: BASE_URL + "student/add-education",
  studentAddExperience: BASE_URL + "student/add-experience",

  // instructor
  instructorProfileUpdate: BASE_URL + "instructor/setup-profile",
  instructorAddEducation: BASE_URL + "instructor/add-education",
  instructorAddExperience: BASE_URL + "instructor/add-experience",
  instructorSkipClick: BASE_URL + "skip/click",
  

  
};
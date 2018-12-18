import { DOMAIN, BIZ } from '../../Common/Blend';

const API_URL_BIZ = `${DOMAIN}iam/users/client?`;
const API_URL_PARTNER = `${DOMAIN}iam/users/partner?`;

function SignUpUrl(USER) {
  if(USER.usrCustomerType == BIZ) {
    return `${API_URL_BIZ}usrId=${USER.usrId}&usrPwd=${USER.usrPw}&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
  } else {
    return `${API_URL_PARTNER}usrId=${USER.usrId}&usrPwd=${USER.usrPw}&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
  }
}

function SignUp(USER) {
  return fetch(SignUpUrl(USER), {
    method : 'post'
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch(error => {
    console.error(error);
  })
}

export default SignUp;
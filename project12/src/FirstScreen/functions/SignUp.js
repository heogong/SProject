import { domain } from '../../Common/ApiDomain';

const API_URL = `${domain}iam/users/client?`;

function SignUpUrl(USER) {
  return `${API_URL}usrId=${USER.usrId}&usrPwd=${USER.usrPw}&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
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
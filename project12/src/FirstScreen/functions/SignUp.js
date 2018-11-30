import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}iam/users/client?`;

function SignUpUrl(USER) {
  return `${API_URL}usrId=${USER.usrId}&usrPwd=test&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
}

let SignUp = (USER) => {
  console.log("signUP : ", USER);

  return fetch(SignUpUrl(USER), {method : 'post'})
    .then(response => response.json())
    .then(responseJSON => {
      return {
        code: responseJSON.resultCode,
        msg : responseJSON.resultMsg
      };
    })
    .catch(error => {
        console.error(error);
    })
}

export default SignUp;
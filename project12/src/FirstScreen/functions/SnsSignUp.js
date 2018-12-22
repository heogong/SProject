import { DEV_SNS_DOMAIN } from '../../Common/Blend';

const API_URL = `${DEV_SNS_DOMAIN}iam/users/client`;

function SnsSignUpUrl() {
  return `${API_URL}`;
}

const SnsSignUp = (USER, TOKEN) => {
  const formData = new URLSearchParams();

  formData.append('usrPhoneNum', USER.usrPhoneNum);
  formData.append('snsSignupYn', USER.snsSignupYn);
  formData.append('snsSiteCd', USER.snsType);
  formData.append('snsSiteAccessToken', TOKEN.snsToken);
  formData.append('usrNm', USER.usrNm);

  return fetch(SnsSignUpUrl(), {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:  formData
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default SnsSignUp;
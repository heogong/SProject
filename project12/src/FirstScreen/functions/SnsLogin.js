import { DEV_SNS_DOMAIN } from '../../Common/Blend';

const API_URL = `${DEV_SNS_DOMAIN}iam/users/sns/oauth/token`;

function SnsLoginUrl() {
  return url = `${API_URL}`;
}

const SnsLogin = (TOKEN, snsCode) => {
  const formData = new URLSearchParams();

  formData.append('snsSiteCd', snsCode);
  formData.append('snsSiteAccessToken', TOKEN.snsToken);

  return fetch(SnsLoginUrl(), {
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

export default SnsLogin;
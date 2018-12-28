import { DEV_SNS_DOMAIN } from '../../Common/Blend';

const API_URL = `${DEV_SNS_DOMAIN}iam/users/sns/oauth/token`;

function SnsLoginUrl() {
  return `${API_URL}`;
}

const SnsLogin = (TOKEN, snsCode) => {
  //console.log("snsToken : ", TOKEN.snsToken)
  const data = new FormData();

  data.append('snsSiteCd', snsCode);
  data.append('snsSiteAccessToken', TOKEN.snsToken);

  return fetch(SnsLoginUrl(), {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: data
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default SnsLogin;
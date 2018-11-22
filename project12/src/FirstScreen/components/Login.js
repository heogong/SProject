import { oauthDomain } from '../../COMMON/ApiDomain';

const API_URL = `${oauthDomain}oauth/token?`;

function LoginUrl(USER, TOKEN) {
  return `${API_URL}grant_type=password&client_id=FREEZE_COOLINIC_APP&username=${USER.usrPhoneNum}&password=${USER.snsSignupYn}`;
}

const login = (USER, TOKEN) => {
  return fetch(LoginUrl(USER, TOKEN), {
    method: 'POST',
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

module.exports = { login }
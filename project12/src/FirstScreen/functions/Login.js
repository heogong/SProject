import { OAUTH_DOMAIN } from '../../Common/Blend';

const API_URL = `${OAUTH_DOMAIN}oauth/token?grant_type=password&client_id=FREEZE_COOLINIC_APP&`;

function LoginUrl(USER, TOKEN) {
  let url = '';

  if(USER.snsSignupYn == 'Y') {
    url = `${API_URL}snsToken=${TOKEN.snsToken}&snsSignupYn=${USER.snsSignupYn}`;
  } else {
    url = `${API_URL}username=${USER.usrId}&password=${USER.usrPw}&snsSignupYn=${USER.snsSignupYn}`;
  }
  console.log(url);
  return url;
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

export default login;
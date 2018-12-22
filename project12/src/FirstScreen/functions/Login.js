import { OAUTH_DOMAIN } from '../../Common/Blend';

const API_URL = `${OAUTH_DOMAIN}oauth/token?grant_type=password&client_id=FREEZE_COOLINIC_APP&`;

function LoginUrl(USER, TOKEN) {
  return `${API_URL}snsToken=${TOKEN.snsToken}&snsSignupYn=${USER.snsSignupYn}`;
}

const Login = (USER, TOKEN) => {
  return fetch(LoginUrl(USER, TOKEN), {
    method: 'POST',
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default Login;
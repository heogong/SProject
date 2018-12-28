import { OAUTH_DOMAIN } from '../../Common/Blend';

const API_URL = `${OAUTH_DOMAIN}oauth/token?grant_type=password&client_id=FREEZE_COOLINIC_APP&`;

function LoginUrl(USER) {
  return `${API_URL}username=${USER.usrId}&password=${USER.usrPw}`;
}

const Login = (USER) => {
  return fetch(LoginUrl(USER), {
    method: 'POST',
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default Login;
import { oauthDomain } from '../ApiDomain';

const API_URL = `${oauthDomain}/oauth/token?grant_type=refresh_token&client_id=FREEZE_COOLINIC_APP&refresh_token=`;

function TokenUrl(TOKEN) {
  
  return `${API_URL}${TOKEN.refreshToken}`;
}

const GetAccessToken = (TOKEN) => {
  return fetch(TokenUrl(TOKEN), {
    method: 'POST',
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default GetAccessToken;
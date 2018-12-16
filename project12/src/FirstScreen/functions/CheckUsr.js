import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}iam/users/phonenum/`;

function CheckUsrUrl(number) {
  return `${API_URL}${number}`;
}

function CheckUsr(number) {
  return fetch(CheckUsrUrl(number), {
    method : 'get'
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch(error => {
    console.error(error);
  })
}

export default CheckUsr;
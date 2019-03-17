import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}iam/users/checkExistByUsrId`;

function CheckUsrEmailUrl() {
  return `${API_URL}`;
}

function CheckUsrEmail(email) {
  const data = new FormData();
  data.append('usrId', email);

  return fetch(CheckUsrEmailUrl(), {
    method : 'POST',
    body: data
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch(error => {
    console.error(error);
  })
}

export default CheckUsrEmail;
import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}/coolinic/sms/checkSmsCertNum?`;

function CheckSmsCertNumUrl(sendId, number) {
  return `${API_URL}smsSendId=${sendId}&certNum=${number}`;
}

function CheckSmsCertNum(sendId, number) {
  return fetch(CheckSmsCertNumUrl(sendId, number), {
    method : 'post'
  }).then((response) => response.json()).then((responseJson) => {
      return responseJson;
  }).catch(error => {
      console.error(error);
  })
}

export default CheckSmsCertNum;
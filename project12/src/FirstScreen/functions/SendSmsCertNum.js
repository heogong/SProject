import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}/coolinic/sms/sendSmsCertNum?`;

function SmsCertUrl(number) {
  return `${API_URL}usrPhoneNum=${number}`;
}

function SendSmsCertNum(number) {
    console.log(SmsCertUrl(number));
  return fetch(SmsCertUrl(number), {
        method : 'post'
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch(error => {
        console.error(error);
    })
}

export default SendSmsCertNum;
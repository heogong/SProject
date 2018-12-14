import { domain } from '../../Common/ApiDomain';

const API_URL = `${domain}/coolinic/sms/sendSmsCertNum?`;

function SmsCertUrl(number) {
  return `${API_URL}usrPhoneNum=${number}`;
}

function SendSmsCertNum(number) {
  return fetch(SmsCertUrl(number), {
        method : 'post'
    }).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch(error => {
        console.error(error);
    })
}

export default SendSmsCertNum;
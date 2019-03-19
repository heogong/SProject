import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}iam/users/findUsrId?usrNm=`;

// 아이디 찾기 요청
function FindUserIdUrl(usrNm, usrPhoneNum) {
  return `${API_URL}${usrNm}&usrPhoneNum=${usrPhoneNum}`;
}

const FindUserId = async (usrNm, usrPhoneNum) => {
  return fetch(FindUserIdUrl(usrNm, usrPhoneNum), {
    method: 'GET',
  }).then((response) => response.json()).then(async (responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default FindUserId;
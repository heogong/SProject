import { DOMAIN } from '~/Common/Blend';

const API_URL = `${DOMAIN}iam/users/findUsrPw?usrId=`;

// 비밀번호 찾기 요청
function FindUserPwdUrl(usrId, usrNm, usrPhoneNum) {
  return `${API_URL}${usrId}&usrNm=${usrNm}&usrPhoneNum=${usrPhoneNum}`;
}

const FindUserPwd = async (usrId, usrNm, usrPhoneNum) => {
  return fetch(FindUserPwdUrl(usrId, usrNm, usrPhoneNum), {
    method: 'GET',
  }).then((response) => response.json()).then(async (responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default FindUserPwd;
import { DOMAIN } from '~/Common/Blend';

const API_URL = `${DOMAIN}iam/users/changeUsrPw?usrId=`;

// 비밀번호 변경 요청
function ChangeUserPwdUrl(usrId, usrNm, usrPhoneNum, pwd) {
  return `${API_URL}${usrId}&usrNm=${usrNm}&usrPhoneNum=${usrPhoneNum}&changeUsrPwd=${pwd}`;
}

const ChangeUserPwd = async (usrId, usrNm, usrPhoneNum, pwd) => {
  return fetch(ChangeUserPwdUrl(usrId, usrNm, usrPhoneNum, pwd), {
    method: 'POST',
  }).then((response) => response.json()).then(async (responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default ChangeUserPwd;
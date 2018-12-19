import { DOMAIN, BIZ, SUCCESS_RETURN_CODE } from '../../Common/Blend';
import { AsyncStorage } from "react-native"

const API_URL_BIZ = `${DOMAIN}iam/users/client?`;
const API_URL_PARTNER = `${DOMAIN}iam/users/partner?`;

function SignUpUrl(USER) {
  if(USER.usrCustomerType == BIZ) {
    return `${API_URL_BIZ}usrId=${USER.usrId}&usrPwd=${USER.usrPw}&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
  } else {
    return `${API_URL_PARTNER}usrId=${USER.usrId}&usrPwd=${USER.usrPw}&usrNm=${USER.usrNm}&usrPhoneNum=${USER.usrPhoneNum}&snsSignupYn=${USER.snsSignupYn}`;
  }
}

function SignUp(USER) {
  return fetch(SignUpUrl(USER), {
    method : 'post'
  }).then((response) => response.json()).then(async (responseJson) => {
    console.log(responseJson);
    if(responseJson.resultCode == SUCCESS_RETURN_CODE) {
      await AsyncStorage.setItem('AccessToken', responseJson.data.access_token); // AsyncStorage 토큰 저장
      await AsyncStorage.setItem('RefreshToken', responseJson.data.refresh_token); // AsyncStorage 갱신 토큰 저장
    }
    
    return responseJson;
  }).catch(error => {
    console.error(error);
  })
}

export default SignUp;
import { DEV_SNS_DOMAIN, CLIENT, SUCCESS_RETURN_CODE } from '../../Common/Blend';

const API_URL_CLIENT = `${DEV_SNS_DOMAIN}iam/users/client`;
const API_URL_PARTNER = `${DEV_SNS_DOMAIN}iam/users/partner`;

function SnsSignUpUrl() {
  return (USER.usrCustomerType == CLIENT) ? `${API_URL_CLIENT}` : `${API_URL_PARTNER}`;
}

const SnsSignUp = (USER, TOKEN) => {
  const data = new FormData();

  data.append('usrPhoneNum', USER.usrPhoneNum);
  data.append('snsSignupYn', USER.snsSignupYn);
  data.append('snsSiteCd', USER.snsType);
  data.append('snsSiteAccessToken', TOKEN.snsToken);
  data.append('usrNm', USER.usrNm);
  data.append('clientId', 'FREEZE_COOLINIC_APP');

  return fetch(SnsSignUpUrl(), {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: data
  }).then((response) => response.json()).then((responseJson) => {
    if(responseJson.resultCode == SUCCESS_RETURN_CODE) {
      //await AsyncStorage.setItem('AccessToken', responseJson.data.access_token); // AsyncStorage 토큰 저장
      //await AsyncStorage.setItem('RefreshToken', responseJson.data.refresh_token); // AsyncStorage 갱신 토큰 저장
    }

    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default SnsSignUp;
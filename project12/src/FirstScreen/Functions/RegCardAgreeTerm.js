import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/terms/paym?`;

// 결제 약관 동의 등록
function RegAgreeTermUrl(agreeTerms) {
  return `${API_URL}paymTermsYn01=${agreeTerms.checkBox1}&paymTermsYn02=${agreeTerms.checkBox2}&paymTermsYn03=${agreeTerms.checkBox3}&paymTermsYn04=${agreeTerms.checkBox4}`;
}

const RegAgreeTerm = async (agreeTerms) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`;

  return fetch(RegAgreeTermUrl(agreeTerms), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN
      // "Authorization": TEST_ACCESS_TOKEN
    }
  }).then((response) => response.json()).then(async (responseJson) => {
    // 액세스 토큰 만료
    if(responseJson.error == INVAILD_TOKEN) {
      await GetAccessToken();
      return REFRESH_TOKEN;
    } else {
      return responseJson;
    }
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default RegAgreeTerm;
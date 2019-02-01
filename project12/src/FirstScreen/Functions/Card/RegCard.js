import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/payment/card?`;

function RegCardUrl() {
  return `${API_URL}`;
}

const RegCard = async (CARD) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  data.append('cardNumber', CARD.cardNumber);
  data.append('expiry', `20${CARD.vaildTermYear}-${CARD.vaildTermMonth}`);
  data.append('birth', CARD.birthDay);
  data.append('pwd2digit', CARD.passwd);

  return fetch(RegCardUrl(), {
    method : 'post',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN
      "Content-Type": "multipart/form-data"
    },
    body: data
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

export default RegCard;
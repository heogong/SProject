import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/payment/card?`;

function RegCardUrl(CARD) {
  return `${API_URL}cardNumber=${CARD.cardNumber}
  &expiry=20${CARD.vaildTermYear}-${CARD.vaildTermMonth}
  &birth=${CARD.birthDay}
  &pwd2digit=${CARD.passwd}`;
}

const RegCard = async (CARD) => {
  const AccessToken = await AsyncStorage.getItem('AccessToken');
  console.log(RegCardUrl(CARD));
  return fetch(RegCardUrl(CARD), {
    method : 'post',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
      //"Authorization": "Bearer "+ AccessToken
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

export default RegCard;
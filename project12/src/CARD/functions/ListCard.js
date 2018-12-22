import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/payment/cards/me`;

function ListCardUrl() {
  return `${API_URL}`;
}

const ListCard = async () => {
  const AccessToken = await AsyncStorage.getItem('AccessToken');
  return fetch(ListCardUrl(), {
    method : 'GET',
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

export default ListCard;
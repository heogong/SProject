import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/clients/products/bplaces/me`;

function GetBizListUrl() {
  return `${API_URL}`;
}

const getBizList = async () => {
  const AccessToken = await AsyncStorage.getItem('AccessToken');
  //const RefreshToken = await AsyncStorage.getItem('RefreshToken');

  return fetch(GetBizListUrl(), {
    method: 'GET',
    headers: {
      "Authorization": "Bearer "+ AccessToken
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

export default getBizList;
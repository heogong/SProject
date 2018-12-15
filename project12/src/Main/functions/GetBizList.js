import { domain } from '../../Common/ApiDomain';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${domain}/coolinic/clients/products/bplaces/me`;

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
    if(responseJson.error == "invalid_token") {
      await GetAccessToken();
      return "AccessTokenRefresh";
    } else {
      return responseJson;
    }
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default getBizList;
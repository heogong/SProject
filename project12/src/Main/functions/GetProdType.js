import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/products/types/root`;

function GetProdTypeUrl() {
  return `${API_URL}`;
}

const getProdType = async () => {
  const AccessToken = await AsyncStorage.getItem('AccessToken');

  return fetch(GetProdTypeUrl(), {
    method: 'GET',
    headers: {
      //"Authorization": "Bearer " + AccessToken
      "Authorization": "Bearer c35793b1-6f77-44ba-95cd-410abe778b69"
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

export default getProdType;
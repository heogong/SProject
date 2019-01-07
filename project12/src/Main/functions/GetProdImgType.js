import { AsyncStorage } from 'react-native'
import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN, TEST_ACCESS_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/products/types/`;

function GetProdImgTypeUrl(prodTypeId) {
  return `${API_URL}${prodTypeId}/imgcates`;
}

const GetProdImgType = async (prodTypeId) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  return fetch(GetProdImgTypeUrl(prodTypeId), {
    method: 'GET',
    headers: {
      "Authorization": ACCESS_TOKEN
      //"Authorization": TEST_ACCESS_TOKEN
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

export default GetProdImgType;
import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import { AsyncStorage } from "react-native"
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/api/kakao/local/geo/coord2address?`;

function GetAddressInfoUrl(region) {
  return `${API_URL}lat=${region.latitude}&lng=${region.longitude}`;
}

const GetAddressInfo = async (region) => {
  const AccessToken = await AsyncStorage.getItem('AccessToken');
  return fetch(GetAddressInfoUrl(region), {
    method: 'GET',
    headers: {
     // "Authorization": "Bearer "+ AccessToken
     "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
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

export default GetAddressInfo;
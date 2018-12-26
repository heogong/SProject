import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/api/kakao/local/geo/coord2address?`;

function GetAddressInfoUrl(region) {
  return `${API_URL}lat=${region.latitude}&lng=${region.longitude}`;
}

const GetAddressInfo = async (region) => {
  return fetch(GetAddressInfoUrl(region), {
    method: 'GET',
    headers: {
     "Authorization": ACCESS_TOKEN
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
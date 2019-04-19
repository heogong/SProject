import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}api/kakao/local/search/address?query=`;

function GetAddressInfoKakaoUrl(strAddress) {
  return `${API_URL}${strAddress}`;
}

const AddressInfoKako = (strAddress) => {
  return fetch(GetAddressInfoKakaoUrl(strAddress), {
    method: 'GET',
    headers: {
      "Authorization": TEST_ACCESS_TOKEN
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

export default AddressInfoKako;
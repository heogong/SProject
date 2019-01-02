import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/clients/products/bplace/`;

function GetBizPlaceUrl(bizPlaceId) {
  return `${API_URL}${bizPlaceId}`;
}

const getBizList = (bizPlaceId) => {
  return fetch(GetBizPlaceUrl(bizPlaceId), {
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

export default getBizList;
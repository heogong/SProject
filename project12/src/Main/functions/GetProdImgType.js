import { DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/products/types/2/imgcates`;

function GetProdImgTypeUrl() {
  return `${API_URL}`;
}

const getProdImgType = async () => {
  return fetch(GetProdImgTypeUrl(), {
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

export default getProdImgType;
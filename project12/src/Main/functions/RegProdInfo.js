import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/clients/products/masters`;

function RegProdInfoUrl() {
  return `${API_URL}`;
}
const RegProdInfo = (prodObj) => {
  console.log(prodObj);
  return fetch(RegProdInfoUrl(), {
    method: 'POST',
    headers: {
      "Authorization": TEST_ACCESS_TOKEN,
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(prodObj)

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

export default RegProdInfo;
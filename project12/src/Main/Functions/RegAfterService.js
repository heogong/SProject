import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// 회원 AS 접수
const API_URL = `${DOMAIN}coolinic/as/recv/master/member`;

function RegAfterServiceUrl() {
  return `${API_URL}`;
}
const RegAfterService = async (clientPrdId, asItemId, asRecvDsc, etcComment) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();
  data.append('clientPrdId', clientPrdId); 
  data.append('asItemId', asItemId);
  data.append('asRecvDsc', asRecvDsc);
  data.append('etcComment', etcComment);

  return fetch(RegAfterServiceUrl(), {
    method: 'POST',
    body:  data,
    headers: {
      "Authorization": ACCESS_TOKEN,
      // "Authorization": TEST_ACCESS_TOKEN,
      "Content-Type": "multipart/form-data",
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

export default RegAfterService;
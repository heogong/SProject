import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/calculate/tmonth/me/hist?p=`;

function GetSettlementDetailPageUrl(pageNum) {
  return `${API_URL}${pageNum}`;
}

const GetSettlementDetailPage = async (pageNum) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  return fetch(GetSettlementDetailPageUrl(pageNum), {
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

export default GetSettlementDetailPage;
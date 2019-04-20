import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// 나의 AS 매칭 목록 조회
const API_URL = `${DOMAIN}coolinic/as/prgs/matchs/partners/me`;

function GetAfterServiceUrl(p) {
  if(p != null && p != '') {
  // Param이 있으면
    // Limit(메인용) 제한
    return `${API_URL}?p=` + p;
  } else {
    return `${API_URL}`;
  }

}

const GetAfterService = async (p) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  return fetch(GetAfterServiceUrl(p), {
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

export default GetAfterService;
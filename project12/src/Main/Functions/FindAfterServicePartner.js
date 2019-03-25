import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// AS 가능 업체 찾기(AS 진행 시작)
const API_URL = `${DOMAIN}coolinic/as/prgs/match/start?asRecvId=`;

function FindAfterServicePartnerUrl(asRecvId) {
  return `${API_URL}${asRecvId}`;
}

const FindAfterServicePartner = async (asRecvId) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  console.log("AS 가능 업체 찾기(AS 진행 시작) - ",FindAfterServicePartnerUrl(asRecvId));

  return fetch(FindAfterServicePartnerUrl(asRecvId), {
    method: 'GET',
    headers: {
      "Authorization": ACCESS_TOKEN
      // "Authorization": TEST_ACCESS_TOKEN
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

export default FindAfterServicePartner;
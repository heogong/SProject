import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/as/prgs/report/recvinfo/me?asPrgsId=`;

// AS 보고서 접수(신청) 정보 조회
function GetAfterServiceReportUrl(asPrgsId) {
  return `${API_URL}${asPrgsId}`;
}
const GetAfterServiceReport = async (asPrgsId) => {

  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 
  return fetch(GetAfterServiceReportUrl(asPrgsId), {
    method: 'GET',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN,
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

export default GetAfterServiceReport;
import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

// AS 보고서 등록
const API_URL = `${DOMAIN}coolinic/as/prgs/report/info`;

// AS 보고서 기본 정보 등록
function RegAfterServiceReportUrl(methodType) {
  if(`${methodType}` == 'POST') {
  // 등록시
    return `${API_URL}`;
  } else if(`${methodType}` == 'PUT') {
  // 수정시
  return `${API_URL}/mod`;
  }
}
const RegAfterServiceReport = async (asPrgsId, asCauseDsc, asActionDsc, methodType) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  // Form Data Param Setting
  const data = new FormData();
  data.append('asPrgsId', asPrgsId); 
  data.append('asCauseDsc', asCauseDsc);
  data.append('asActionDsc', asActionDsc);

  return fetch(RegAfterServiceReportUrl(methodType), {
    method: 'POST',
    body:  data,
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN,
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

export default RegAfterServiceReport;
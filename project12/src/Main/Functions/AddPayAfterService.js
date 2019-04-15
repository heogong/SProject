import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// 업체 AS 추가 진행(결제) 요청
const API_URL = `${DOMAIN}coolinic/as/prgs/match/add`;

function AddPayAfterServiceUrl() {
  return `${API_URL}`;
}

const AddPayAfterService = async (asPrgsId, asText, asCost, asAddComment) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  // Form Data Param Setting
  const data = new FormData();
  data.append('asPrgsId', asPrgsId); 
  data.append('asAddTitle', asText);
  data.append('asAddCost', asCost);
  data.append('asAddComment', asAddComment);

  return fetch(AddPayAfterServiceUrl(asPrgsId, asText, asCost, asAddComment), {
    method: 'POST',
    body:  data,
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN
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

export default AddPayAfterService;
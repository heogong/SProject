import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN, COMPANY_TYPE_CD } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/master?companyNm=`;

// 사업자 정보 등록
function RegPartnerMasterUrl(companyInfo) {
  return `${API_URL}${companyInfo.companyNm}&ceoNm=${companyInfo.ceoNm}&companyBusinessNum=${companyInfo.companyBusinessNum}&companyTypeCd=${COMPANY_TYPE_CD}`;
}

const RegPartnerMaster = async (companyInfo) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  console.log(RegPartnerMasterUrl(companyInfo));

  return fetch(RegPartnerMasterUrl(companyInfo), {
    method: 'POST',
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

export default RegPartnerMaster;
import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/work?`;

function RegPartnerWorkUrl() {
  return `${API_URL}`
}

const RegPartnerWork = async (work) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  data.append('workStTime', work.workStTime);
  data.append('workEdTime', work.workEdTime );
  data.append('monWorkYn', work.monWorkYn);
  data.append('tueWorkYn', work.tueWorkYn);
  data.append('wedWorkYn', work.wedWorkYn);
  data.append('thuWorkYn', work.thuWorkYn);
  data.append('friWorkYn', work.friWorkYn);
  data.append('satWorkYn', work.satWorkYn);
  data.append('sunWorkYn', work.sunWorkYn);
  data.append('holidayWorkYn', work.holidayWorkYn);
  data.append('fullWorkYn', work.fullWorkYn);

  return fetch(RegPartnerWorkUrl(), {
    method: 'POST',
    headers: {
       "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN,
      "Content-Type": "multipart/form-data"
    },
    body : data
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

export default RegPartnerWork;
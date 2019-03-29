import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// 업체 근무 정보 수정
const API_URL = `${DOMAIN}coolinic/partners/work?`;

function EditPartnerWorkUrl() {
  return `${API_URL}`;
}

const EditPartnerWork = async (work, businessDay) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  data.append('workStTime', `${work.stHour}${work.stMin}`);
  data.append('workEdTime', `${work.edHour}${work.edMin}`);
  data.append('monWorkYn', businessDay.monWorkYn);
  data.append('tueWorkYn', businessDay.tueWorkYn);
  data.append('wedWorkYn', businessDay.wedWorkYn);
  data.append('thuWorkYn', businessDay.thuWorkYn);
  data.append('friWorkYn', businessDay.friWorkYn);
  data.append('satWorkYn', businessDay.satWorkYn);
  data.append('sunWorkYn', businessDay.sunWorkYn);
  data.append('holidayWorkYn', businessDay.holidayWorkYn);
  data.append('fullWorkYn', businessDay.fullWorkYn);

  console.log(data);

  return fetch(EditPartnerWorkUrl(), {
    method: 'PUT',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN
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

export default EditPartnerWork;
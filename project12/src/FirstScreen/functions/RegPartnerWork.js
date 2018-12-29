import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/work?`;

function RegPartnerWorkUrl(data) {
  return `${API_URL}
  workStTime=${data}
  &workEdTime=${data}
  &monWorkYn=${data}
  &tueWorkYn=${data}
  &wedWorkYn=${data}
  &thuWorkYn=${data}
  &friWorkYn=${data}
  &satWorkYn=${data}
  &sunWorkYn=${data}
  &holidayWorkYn=${data}
  &fullWorkYn=${data}`;
}

const RegPartnerWork = (data) => {
  return fetch(RegPartnerWorkUrl(data), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN
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

export default RegPartnerWork;
import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/prdtypes`;

function RegPartnerProdTypeUrl() {
  return `${API_URL}`;
}

const RegPartnerProdType = async (data) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`;

  // console.log("selectdata : ", data);
  // let details = {
  //   'prdTypeIds': JSON.stringify(data)
  // };

  // console.log(JSON.stringify(data));
  // let formBody = [];

  // for (let property in details) {
  //     let encodedKey = encodeURIComponent(property);
  //     let encodedValue = encodeURIComponent(details[property]);
  //     let encodedKey = property;
  //     let encodedValue = details[property];
  //     formBody.push(encodedKey + "=" + encodedValue);
  // }

  return fetch(RegPartnerProdTypeUrl(), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN,
      "Content-Type" : "application/json"
    },
    //body:  formBody
    body : JSON.stringify(data)
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

export default RegPartnerProdType;
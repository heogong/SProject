import { oauthDomain } from '../../COMMON/ApiDomain';

//const API_URL = `${oauthDomain}oauth/token?grant_type=password&client_id=FREEZE_COOLINIC_APP&`;
const TEST_URL = 'https://dapi.kakao.com/v2/local/search/address.json?query='

function GetAddressUrl(strAddress) {
  return `${TEST_URL}${strAddress}`;
}

const addressInfo = (strAddress) => {
  console.log("strAddress : ",strAddress);
  return fetch(GetAddressUrl(strAddress), {
    method: 'GET',
    headers: {
      "Authorization": "KakaoAK c3c8b7f8fca6eeae1be100635c122fc0"
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default addressInfo;
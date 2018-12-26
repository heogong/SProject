import { ACCESS_TOKEN, DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}/api/kakao/local/search/address?query=`;

function GetAddressUrl(strAddress) {
  return `${API_URL}${strAddress}`;
}

const addressInfo = (strAddress) => {
  console.log("strAddress : ",strAddress);
  return fetch(GetAddressUrl(strAddress), {
    method: 'GET',
    headers: {
      "Authorization": ACCESS_TOKEN
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default addressInfo;
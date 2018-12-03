import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}/api/kakao/local/search/address?query=`;

function GetAddressUrl(strAddress) {
  return `${API_URL}${strAddress}`;
}

const addressInfo = (strAddress) => {
  console.log("strAddress : ",strAddress);
  return fetch(GetAddressUrl(strAddress), {
    method: 'GET',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default addressInfo;
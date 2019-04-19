// import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
// import GetAccessToken from '../../Common/Functions/GetAccessToken';

// const API_URL = `${DOMAIN}api/kakao/local/search/address?query=`;

// function GetAddressUrl(strAddress) {
//   return `${API_URL}${strAddress}`;
// }

// const addressInfo = (strAddress) => {
//   return fetch(GetAddressUrl(strAddress), {
//     method: 'GET',
//     headers: {
//       "Authorization": TEST_ACCESS_TOKEN
//     }
//   }).then((response) => response.json()).then(async (responseJson) => {
//     // 액세스 토큰 만료
//     if(responseJson.error == INVAILD_TOKEN) {
//       await GetAccessToken();
//       return REFRESH_TOKEN;
//     } else {
//       return responseJson;
//     }
//   }).catch((err) => {
//     console.log('ERROR');
//     console.log(err);
//   });
// };

// export default addressInfo;

import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}api/juso/search/address?keyword=`;

function GetAddressUrl(strAddress, currentPage) {
  return `${API_URL}${strAddress}"&currentPage=${currentPage}`;
}

const addressInfo = (strAddress, currentPage) => {
  return fetch(GetAddressUrl(strAddress, currentPage), {
    method: 'GET',
    headers: {
      "Authorization": TEST_ACCESS_TOKEN
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

export default addressInfo;
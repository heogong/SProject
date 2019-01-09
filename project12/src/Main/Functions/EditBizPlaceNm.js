import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/clients/products/bplace?`;

// 사업장 수정 - 상세주소만 변경
function EditBizPlaceNmUrl(bizObj) {
  return `${API_URL}clientBplaceId=${bizObj.bizId}
  &detail.detailAddr1=${bizObj.addressDsc}
  `;
}

const EditBizPlaceNm = async (bizObj) => {
   // 토큰값 가져오기
   const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 
  //console.log("bizObj : ",bizObj);
  //console.log("RegBizPlaceUrl : ",RegBizPlaceUrl(bizObj))
  return fetch(EditBizPlaceNmUrl(bizObj), {
    method: 'PUT',
    headers: {
      "Authorization": ACCESS_TOKEN
      //"Authorization": TEST_ACCESS_TOKEN
    }
  }).then((response) => response.json()).then(async (responseJson) => {
    // 액세스 토큰 만료
    if(responseJson.error == INVAILD_TOKEN) {
     await GetAccessToken();
     return "AccessTokenRefresh";
    } else {
      return responseJson;
    }
}).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default EditBizPlaceNm;
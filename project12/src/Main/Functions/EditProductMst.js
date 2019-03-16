import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/clients/products/master?`;

function EditProductMstUrl(prodId, prodNm, prodDsc) {
  return `${API_URL}clientPrdId=${prodId}&clientPrdNm=${prodNm}&clientPrdDsc=${prodDsc}`;
}

const EditProductMst = async (prodId, prodNm, prodDsc) => {

  // console.log(EditProductMstUrl(prodId, prodNm, prodDsc))
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  return fetch(EditProductMstUrl(prodId, prodNm, prodDsc), {
    method: 'PUT',
    headers: {
      "Authorization": ACCESS_TOKEN
      //"Authorization": TEST_ACCESS_TOKEN
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

export default EditProductMst;
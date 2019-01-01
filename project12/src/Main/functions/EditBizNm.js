import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/clients/products/bplace?`;

function EditBizNmUrl(bizObj) {
  console.log(bizObj);
  return `${API_URL}clientBplaceId=${bizObj.bizId}
  &bplaceNm=${bizObj.bizNm}
  &bplaceDsc=${bizObj.bizDsc}
  `;
}

const EditBizNm = async (bizObj) => {
  //console.log("bizObj : ",bizObj);
  //console.log("RegBizPlaceUrl : ",RegBizPlaceUrl(bizObj))
  return fetch(EditBizNmUrl(bizObj), {
    method: 'PUT',
    headers: {
      "Authorization": ACCESS_TOKEN
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

export default EditBizNm;
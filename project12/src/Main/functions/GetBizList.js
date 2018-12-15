import { domain } from '../../Common/ApiDomain';

const API_URL = `${domain}/coolinic/clients/products/bplaces/me`;

function GetBizListUrl() {
  return `${API_URL}`;
}

const getBizList = (AccessToken) => {
  
  //const RefreshToken = await AsyncStorage.getItem('RefreshToken');
  return fetch(GetBizListUrl(), {
    method: 'GET',
    headers: {
      "Authorization": "Bearer "+ AccessToken
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default getBizList;
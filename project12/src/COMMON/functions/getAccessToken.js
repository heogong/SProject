import { oauthDomain } from '../ApiDomain';
import { AsyncStorage } from "react-native"

const API_URL = `${oauthDomain}oauth/token?grant_type=refresh_token&client_id=FREEZE_COOLINIC_APP&refresh_token=`;

function TokenUrl(RefreshToken) {
  return `${API_URL}${RefreshToken}`;
}

const GetAccessToken = async () => {
  const RefreshToken = await AsyncStorage.getItem('RefreshToken');
  
  return fetch(TokenUrl(RefreshToken), {
    method: 'POST',
  }).then((response) => response.json()).then(async (responseJson) => {
    if(responseJson.access_token) {
      await AsyncStorage.setItem('AccessToken', responseJson.access_token); // AsyncStorage 토큰 저장
      await AsyncStorage.setItem('RefreshToken', responseJson.refresh_token); // AsyncStorage 갱신 토큰 저장

      return true;
    } else {
      return false;
    }
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default GetAccessToken;
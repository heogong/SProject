import { AsyncStorage } from "react-native"
//const AccessToken = await AsyncStorage.getItem('AccessToken');

_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
     }
}

// API domain 관련
export const DOMAIN = 'http://13.209.87.118:8180/';
export const OAUTH_DOMAIN = 'http://13.209.87.118:8280/';
export const DEV_SNS_DOMAIN = 'http://54.180.107.38:8180/';

// 토큰 STRING 관련
export const INVAILD_TOKEN = 'invalid_token';
export const REFRESH_TOKEN = 'AccessTokenRefresh';
export const ACCESS_TOKEN = 'Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a';
// export const ACCESS_TOKEN = async () => {
//     let AccessToken;
//     try {
//         AccessToken = await AsyncStorage.getItem('AccessToken');
//     } catch (error) {
//       console.log(error);
//     }
//     return `Bearer ${AccessToken}`;
// }

// API 결과 STRING 관련
export const SUCCESS_RETURN_CODE = '0000';
export const FAIL_RETURN_CODE_9020 = '9020'; // API 인증이 실패하였습니다.
export const FAIL_RETURN_CODE_9021 = '9021'; // 결제 카드 등록이 실패하였습니다.
export const FAIL_RETURN_CODE_9024 = '9024'; // 유효하지 않은 카드정보입니다.

// SNS 구분 코드
export const NAVER_CODE = 'SNS_SITE_CD_01'; // 네이버
export const KAKAO_CODE = 'SNS_SITE_CD_02'; // 카카오
export const FACE_BOOK_CODE = 'SNS_SITE_CD_03'; // 페이스북

// etc
export const BIZ = "BUSINESS";
export const PARTNER = "PARTNER";

import { REFRESH_TOKEN } from '../../Common/Blend';

// data : API 호출 리턴 값
// selfFn : 토큰값 만료 시 갱신 후 다시 호출 될 함수
async function GetCommonData(data, selfFn) {
    const TokenState = await (data == REFRESH_TOKEN) ? true : false; // 토큰 갱신 여부

     // 토큰 갱신됐을 경우 재귀 호출
     if (TokenState) {
        await selfFn();
    } else {
        return data;
    }
}

export default GetCommonData;
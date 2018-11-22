export const SET_USRID = 'SET_USRID';
export const SET_USRNM = 'SET_USRNM';
export const SET_USRPHONE_NUM = 'SET_USRPHONE_NUM';
export const SET_SNS_SIGN = 'SET_SNS_SIGN';

export const SET_SNS_TOKEN = 'SET_SNS_TOKEN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_ATOKEN = 'SET_REFRESH_ATOKEN';

export function setUsrId(value) {
    return {
        type: SET_USRID,
        value: value
    };
}
export function setUsrNm(value) {
    return {
        type: SET_USRNM,
        value: value
    };
}
export function setUsrPhoneNum(value) {
    return {
        type: SET_USRPHONE_NUM,
        value: value
    };
}
export function setSnsSignYn(value) {
    return {
        type: SET_SNS_SIGN,
        value: value
    };
}

export function setSnsToken(value) {
    return {
        type: SET_SNS_TOKEN,
        value: value
    };
}
export function setAccessToken(value) {
    return {
        type: SET_ACCESS_TOKEN,
        value: value
    };
}
export function setRefreshToken(value) {
    return {
        type: SET_REFRESH_ATOKEN,
        value: value
    };
}
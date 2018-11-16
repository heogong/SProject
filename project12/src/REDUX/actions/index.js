export const SET_USRID = 'SET_USRID';
export const SET_USRNM = 'SET_USRNM';
export const SET_USRPHONE_NUM = 'SET_USRPHONE_NUM';
export const SET_SNS_SIGN = 'SET_SNS_SIGN';

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
import { 
    SET_USRID, 
    SET_USRNM,
    SET_USRPW,
    SET_USRPHONE_NUM, 
    SET_USR_CUSTOMER_TYPE,
    SET_SNS_SIGN,
    SET_SNS_TOKEN,
    SET_SNS_TYPE,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    SET_BIZ_ID,
    SET_BIZ_NM,
    SET_BIZ_DSC,
    SET_BIZ_ADDRESS,
    SET_BIZ_ADDRESS_DSC,
    SET_INTERVAL_ID,
    SET_IS_AS,
    SET_NOMEM_USRNM,
    SET_NOMEM_USRPHONE_NUM,
    SET_NOMEM_ADDRESS,
    SET_NOMEM_ADDRESS_DSC
} from '../Actions';
import { combineReducers } from 'redux';
import { PARTNER } from '../../Common/Blend';

import { AsyncStorage } from "react-native"

const InitialUserState = {
    usrId: '',
    usrNm: '',
    usrPw: '',
    usrPhoneNum: '',
    usrCustomerType: PARTNER,
    snsType: '',
    snsSignupYn: 'N'
};

const InitialNoMemberUserState = {
    usrNm: '',
    usrPhoneNum: '',
    addressObj: [],
    addressDsc: ''
};

const InitialTokenState = {
    snsToken: '',
    accessToken: '',
    refreshToken: ''
};

const InitialBizState = {
    bizId: 1,
    bizNm: '',
    bizDsc: '',
    addressObj: [],
    addressDsc: ''
};

const InitialASState = {
    intervalId: 0,
    isAfterService: false,
};

const NO_USER = (state = InitialNoMemberUserState, action) => {
    switch(action.type) {
        case SET_NOMEM_USRNM:
            return Object.assign({}, state, {
                usrNm: action.value
            });
        case SET_NOMEM_USRPHONE_NUM:
            return Object.assign({}, state, {
                usrPhoneNum: action.value
            });
        case SET_NOMEM_ADDRESS:
            return Object.assign({}, state, {
                addressObj: action.value
            });
        case SET_NOMEM_ADDRESS_DSC:
            return Object.assign({}, state, {
                addressDsc: action.value
            });
        default:
            return state;
    }
}

const USER = (state = InitialUserState, action) => {
    switch(action.type) {
        case SET_USRID:
            return Object.assign({}, state, {
                usrId: action.value
            });
        case SET_USRNM:
            return Object.assign({}, state, {
                usrNm: action.value
            });
        case SET_USRPW:
            return Object.assign({}, state, {
                usrPw: action.value
            });
        case SET_USRPHONE_NUM:
            return Object.assign({}, state, {
                usrPhoneNum: action.value
            });
        case SET_SNS_SIGN:
            return Object.assign({}, state, {
                snsSignupYn: action.value
            });
        case SET_SNS_TYPE:
            return Object.assign({}, state, {
                snsType: action.value
            });
        case SET_USR_CUSTOMER_TYPE:
            return Object.assign({}, state, {
                usrCustomerType: action.value
            });
        default:
            return state;
    }
}

const TOKEN = (state = InitialTokenState, action) => {
    switch(action.type) {
        case SET_SNS_TOKEN:
            return Object.assign({}, state, {
                snsToken: action.value
            });
        case SET_ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.value
            });
        case SET_REFRESH_TOKEN:
            return Object.assign({}, state, {
                refreshToken: action.value
            });
        default:
            return state;
    }
}

const BIZ = (state = InitialBizState, action) => {
    switch(action.type) {
        case SET_BIZ_ID:
            return Object.assign({}, state, {
                bizId: action.value
            });
        case SET_BIZ_NM:
            return Object.assign({}, state, {
                bizNm: action.value
            });
        case SET_BIZ_DSC:
            return Object.assign({}, state, {
                bizDsc: action.value
            });
        case SET_BIZ_ADDRESS:
            return Object.assign({}, state, {
                addressObj: action.value
            });
        case SET_BIZ_ADDRESS_DSC:
            return Object.assign({}, state, {
                addressDsc: action.value
            });
        default:
            return state;
    }
}

const AFTERSERVICE = (state = InitialASState, action) => {
    switch(action.type) {
        case SET_INTERVAL_ID:
            return Object.assign({}, state, {
                intervalId: action.value
            });
        case SET_IS_AS:
            return Object.assign({}, state, {
                isAfterService: action.value
            });
        default:
            return state;
    }
}

const userInfo = combineReducers({
    USER,
    TOKEN,
    BIZ,
    AFTERSERVICE,
    NO_USER
});

export default userInfo;
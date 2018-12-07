import { 
    SET_USRID, 
    SET_USRNM,
    SET_USRPW,
    SET_USRPHONE_NUM, 
    SET_SNS_SIGN,
    SET_SNS_TOKEN,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    SET_BIZ_ID,
    SET_BIZ_NM,
    SET_BIZ_DSC,
    SET_BIZ_ADDRESS,
    SET_BIZ_ADDRESS_DSC
} from '../actions';
import { combineReducers } from 'redux';

const InitialUserState = {
    usrId: '',
    usrNm: '',
    usrPw: '',
    usrPhoneNum: '',
    snsSignupYn: 'N'
};

const InitialTokenState = {
    snsToken: '',
    accessToken: '',
    refreshToken: ''
};

const InitialBizState = {
    bizNm: '',
    bizDsc: '',
    addressObj: [],
    addressDsc: ''
};

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

const userInfo = combineReducers({
    USER,
    TOKEN,
    BIZ
});

export default userInfo;
import { 
    SET_VALUE, 
    SET_USRID, 
    SET_USRNM, 
    SET_USRPHONE_NUM, 
    SET_SNS_SIGN
} from '../actions';
import { combineReducers } from 'redux';

const InitialState = {
    usrId: 'aaaaa',
    usrNm: '박정진',
    usrPhoneNum: '010-0000-0000',
    snsSignupYn: 'N'
};

const USER = (state = InitialState, action) => {
    switch(action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                usrId: action.user.usrId,
                usrNm: action.user.usrNm,
                usrPhoneNum: action.user.usrPhoneNum,
                snsSignupYn: action.user.snsSignupYn
            });
        case SET_USRID:
            return Object.assign({}, state, {
                usrId: action.value.usrId,
            });
        case SET_USRNM:
            return Object.assign({}, state, {
                usrNm: action.value.usrNm,
            });
        case SET_USRPHONE_NUM:
            return Object.assign({}, state, {
                usrPhoneNum: action.value.usrPhoneNum,
            });
        case SET_SNS_SIGN:
            return Object.assign({}, state, {
                snsSignupYn: action.value.snsSignupYn,
            });
        default:
            return state;
    }
}

const userInfo = combineReducers({
    USER
});

export default userInfo;
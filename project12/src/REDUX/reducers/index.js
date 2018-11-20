import { 
    SET_USRID, 
    SET_USRNM, 
    SET_USRPHONE_NUM, 
    SET_SNS_SIGN
} from '../actions';
import { combineReducers } from 'redux';

const InitialState = {
    usrId: '',
    usrNm: '',
    usrPhoneNum: '',
    snsSignupYn: 'N'
};

const USER = (state = InitialState, action) => {
    switch(action.type) {
        case SET_USRID:
            return Object.assign({}, state, {
                usrId: action.value
            });
        case SET_USRNM:
            return Object.assign({}, state, {
                usrNm: action.value
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

const userInfo = combineReducers({
    USER
});

export default userInfo;
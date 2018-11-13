import { SET_VALUE, GET_VALUE } from '../actions';
import { combineReducers } from 'redux';

const InitialState = {
    usrId: 'aaaaa',
    usrNm: '박정진',
    usrPhoneNum: '010-0000-0000'
};

const USER = (state = InitialState, action) => {
    switch(action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                usrId: state.usrId,
                usrNm: state.usrNm,
                usrPhoneNum: state.usrPhoneNum
            });
        case GET_VALUE:
            return state;
        default:
            return state;
    }
}

const userInfo = combineReducers({
    USER
});

export default userInfo;
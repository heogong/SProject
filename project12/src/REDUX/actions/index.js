export const SET_VALUE = 'SET_VALUE';
export const GET_VALUE = 'GET_VALUE';

export function setValue(value) {
    return {
        type: SET_VALUE,
        user: value
    };
}

export function getValue() {
    return {
        type: GET_VALUE
    };
}
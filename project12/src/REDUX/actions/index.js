export const SET_VALUE = 'SET_VALUE';
export const GET_VALUE = 'GET_VALUE';

export function setValue() {
    return {
        type: SET_VALUE
    };
}

export function getValue() {
    return {
        type: GET_VALUE
    };
}
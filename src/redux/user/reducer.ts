import { GET_USER, PUT_USER, PUT_ALLOW_ACTIONS } from './constants'
import update from 'immutability-helper'

const initialState = {
    data: null,
    allowActions: {}
};

export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case PUT_USER:
            return update(state, {
                data: {$set: payload.user},
                allowActions: {$set: payload.allowActions}
            })
        case 'user/PUT_USER_DATA':
            return update(state, {
                data: {$set: payload},
            })
        case PUT_ALLOW_ACTIONS:
            return update(state, {
                allowActions: {$set: payload}
            });
        default:
            return state;
    }
}

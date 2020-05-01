import { GET_LEADERS, PUT_LEADERS, PUT_ERRORS, SET_PENDING, PUT_CURRENT_USER, PUT_RANKING } from './constants'
import update from 'immutability-helper'

const initialState = {
    isPending: false,
    data: [],
    currentUser: null,
    maxAvailableCount: 0,
    statuses: {},
    errors: []
};

export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_LEADERS:
            return state;
        case SET_PENDING:
            return update(state, {
                isPending: {$set: payload}
            })
        case PUT_LEADERS:
            return update(state, {
                data: {$set: payload.data.ranking},
                currentUser: {$set: payload.data.currentUser},
                errors: {$set: []},
                maxAvailableCount: {$set: payload.data.maxAvailableCount},
                statuses: {$set: payload.data.statuses},
                isPending: {$set: false}
            });
        case PUT_RANKING:
            return update(state, {
                data: {$set: payload}
            });
        case PUT_CURRENT_USER:
            return update(state, {
                currentUser: {$set: payload}
            });
        case PUT_ERRORS:
            return update(state, {
                errors: {$set: payload}
            })
        default:
            return state;
    }
}

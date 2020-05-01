import { GET_HISTORY, PUT_HISTORY, PUT_ERRORS, GET_SEARCH, READ_ITEMS, PUT_UNREAD } from './constants'
import update from 'immutability-helper'

const initialState = {
    isPending: false,
    data: [],
    score: 0,
    totalCount: 0,
    unread: 0,
    errors: null
};

export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_HISTORY:
            return update(state, {
                isPending: {$set: true}
            })
        case GET_SEARCH:
            return update(state, {
                isPending: {$set: true}
            })
        case PUT_HISTORY:
            return update(state, {
                isPending: {$set: false},
                data: {$set: payload.history},
                totalCount: {$set: payload.totalCount},
                errors: {$set: null}
            })
        case PUT_UNREAD:
            return update(state, {
                unread: {$set: payload.unreadCount},
                totalCount: {$set: payload.totalCount},
            })
        case READ_ITEMS:
            return update(state, {
                unread: {$set: 0}
            })
        case PUT_ERRORS:
            return update(state, {
                isPending: {$set: false},
                errors: {$set: payload}
            })
        default:
            return state;
    }
}

import { PUT_BASE_DATA, PUT_ALL_DATA, READ_ITEMS } from './constants'
import update from 'immutability-helper'
import { PUT_ERRORS } from './constants';

const initialState = {
    isPending: false,
    items: [],
    totalCount: 0,
    unreadCount: 0,
    errors: null
};

export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case PUT_BASE_DATA:
            return update(state, {
                totalCount: {$set: payload.totalCount},
                unreadCount: {$set: payload.unreadCount}
            })
        case PUT_ALL_DATA:
            return update(state, {
                items: {$set: payload.items},
                totalCount: {$set: payload.totalCount},
                unreadCount: {$set: payload.unreadCount},
                errors: {$set: null}
            })
        case PUT_ERRORS:
            return update(state, {
                items: {$set: []},
                totalCount: {$set: 0},
                unreadCount: {$set: 0},
                isPending: {$set: false},
                errors: {$set: payload}
            })
        case READ_ITEMS:
            return update(state, {
                unreadCount: {$set: 0}
            })
        default:
            return state;
    }
}

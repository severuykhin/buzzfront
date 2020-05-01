import { FETCH_MESSAGE } from './constants'
import update from 'immutability-helper'

const initialState = {
    websocket: null
};

export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        default:
            return state;
    }
}

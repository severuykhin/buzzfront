import { SET_IS_PENDING, SET_DATA, MAKE_ATTEMPT, SET_STATUS, SET_OUT_OF_DATA } from './constants'
import update from 'immutability-helper'

const initialState = {
    isPending: false,
    isAllowPlay: true,
    word: null,
    variants: [],
    currentVariant: 0,
    log: null,
    status: 'neutral', // success, pending
    gameStatus: 'active',
    limitLog: null,
    user: null
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


export function reducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case MAKE_ATTEMPT:
            return update(state, {
                currentVariant: {$set: payload.variantId}
            })
        case SET_STATUS:
            return update(state, {
                status: {$set: payload}
            })
        case SET_IS_PENDING:
            return update(state, {
                isPending: {$set: payload}
            })
        case SET_OUT_OF_DATA:
            return update(state, {
                isPending: {$set: false},
                isAllowPlay: {$set: false},
                word: {$set: null},
                variants: {$set: []},
                currentVariant: {$set: 0},
                status: {$set: 'neutral'},
                limitLog: {$set: payload.limitLog},
                user: {$set: payload.user},
                gameStatus: {$set: payload.gameStatus}
            });
        case SET_DATA:
            return update(state, {
              isPending: {$set: false},
              isAllowPlay: {$set: payload.isAllowPlay},
              word: {$set: payload.word},
              variants: {$set: shuffle(payload.variants)},
              currentVariant: {$set: 0},
              status: {$set: 'neutral'},
              limitLog: {$set: payload.limitLog},
              user: {$set: payload.user},
              gameStatus: {$set: payload.gameStatus}
            });
        default:
            return state;
    }
}

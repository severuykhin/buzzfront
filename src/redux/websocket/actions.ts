import { FETCH_MESSAGE } from './constants'

export const fetchMessage: CallableFunction = (message): object => {
    return {
        type: FETCH_MESSAGE,
        payload: message
    }
}
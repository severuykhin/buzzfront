import { 
    SET_DATA, 
    SET_IS_PENDING, 
    MAKE_ATTEMPT, 
    SET_STATUS, 
    GET_DATA,
    SET_OUT_OF_DATA 
} from './constants'

export const getData = () => {
    return {
        type: GET_DATA,
        payload: {}
    }
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data
    }
}

export const setOutOfData = (data) => {
    return {
        type: SET_OUT_OF_DATA,
        payload: data
    }
}

export const setIsPending = isPending => {
    return {
        type: SET_IS_PENDING,
        payload: isPending
    }
}

export const makeAttempt = ({ wordId, variantId }) => {
    return {
        type: MAKE_ATTEMPT,
        payload: { wordId, variantId }
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        payload: status
    }
}
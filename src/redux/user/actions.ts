import { GET_USER, PUT_USER, PUT_ALLOW_ACTIONS } from './constants'

export const getUser = () => {
    return {
        type: GET_USER,
        payload: null
    }
}

export const putUser = data => {
    return {
        type: PUT_USER,
        payload: data
    }
}

export const putAllowActions = actions => {
    console.log('sdf');
    return {
        type: PUT_ALLOW_ACTIONS,
        payload: actions
    }
}
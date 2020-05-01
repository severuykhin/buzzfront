import { GET_LEADERS, PUT_LEADERS, SET_PENDING, PUT_ERRORS, PUT_CURRENT_USER, PUT_RANKING } from './constants'

export const getLeaders = () => {
    return {
        type: GET_LEADERS,
        payload: {}
    };
}

export const putLeaders = ({ data }) => {
    return {
        type: PUT_LEADERS,
        payload: { data }
    }
}

export const putRanking = (data) => {
    return {
        type: PUT_RANKING,
        payload: data
    }
}

export const setIsPending = (status) => {
    return {
        type: SET_PENDING,
        payload: status
    }
}

export const putErrors = errors => {
    return {
        type: PUT_ERRORS,
        payload: errors
    };
}

export const putCurrentUser = userData => {
    return {
        type: PUT_CURRENT_USER,
        payload: userData
    }
}
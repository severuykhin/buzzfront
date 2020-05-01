import { GET_HISTORY, PUT_HISTORY, PUT_ERRORS, GET_DATA, GET_SEARCH, SET_IS_PENDING_SEARCH, READ_ITEMS, PUT_UNREAD } from './constants'

export const putUnread = ({ unreadCount, totalCount }) => {
    return {
        type: PUT_UNREAD,
        payload: { unreadCount, totalCount }
    }
}

export const getHistory = () => {
    return {
        type: GET_HISTORY,
        payload: null
    }
}

export const putHistory = (data) => {
    return {
        type: PUT_HISTORY,
        payload: data
    }
}

export const putErrors = (errors) => {
    return {
        type: PUT_ERRORS,
        payload: errors
    }
}

export const getSearch = (query: string) => {
    return {
        type: GET_SEARCH,
        payload: query
    }
}

export const getData = () => {
    return {
        type: GET_DATA,
        payload: null
    }
}

export const getIsPendingSearch = (status: boolean) => {
    return {
        type: SET_IS_PENDING_SEARCH,
        payload: status
    }
}

export const readItems = (ids: number[]) => {
    return {
        type: READ_ITEMS,
        payload: ids
    }
}
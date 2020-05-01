import { PUT_BASE_DATA, PUT_ALL_DATA, PUT_ITEMS_DATA, PUT_IS_PENDING, READ_ITEMS, PUT_ERRORS } from './constants'

export const putBaseData = ({ unreadCount, totalCount }) => {
    return {
        type: PUT_BASE_DATA,
        payload: { unreadCount, totalCount } 
    }
}

export const putAllData = ({ items, unreadCount, totalCount }) => {
    return {
        type: PUT_ALL_DATA,
        payload: { items, unreadCount, totalCount } 
    }
}

export const putIsPending = state => {
    return {
        type: PUT_IS_PENDING,
        payload: state
    }
}

export const readItems = () => {
    return {
        type: READ_ITEMS,
        payload: null
    }
}

export const putErrors = errors => {
    return {
        type: PUT_ERRORS,
        payload: errors
    }
}
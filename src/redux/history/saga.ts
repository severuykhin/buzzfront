import { takeLatest, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from '../router/constants'
import { GET_HISTORY, PUT_HISTORY, GET_DATA, GET_SEARCH, READ_ITEMS } from './constants'
import { getHistory, putHistory, putErrors, getIsPendingSearch, putUnread } from './actions'
import HistoryService from '../../includes/Services/HistoryService'

function* listenLocation(action) {
    const { payload: { pathname } } = action;

    if (pathname !== '/guessed') {
        return;
    }   

    yield put(getHistory());

    const response = yield HistoryService.get();

    if (response.result === 'success') {
        yield put(putHistory(response.data));
    } else {
        yield put(putErrors(response.errors));
    }
}

function* listenSearch(action) {
    const { payload } = action;

    yield put(getIsPendingSearch(true));

    const response = yield HistoryService.search(payload);

    if (response.result === 'success') {
        yield put(putHistory(response.data));
    } else {
        yield put(putErrors(response.errors));
    }
}

function* listenGetData(action) {

    yield put(getHistory());

    const response = yield HistoryService.get();

    if (response.result === 'success') {
        yield put(putHistory(response.data));
    } else {
        yield put(putErrors(response.errors));
    }
}

function* listenReadItems(action) {
    const { payload } = action;

    const response = yield HistoryService.read(payload);

}

export function* historySaga() {
    yield takeLatest(LOCATION_CHANGE, listenLocation);
    yield takeLatest(GET_SEARCH, listenSearch)
    yield takeLatest(GET_DATA, listenGetData)
    yield takeLatest(READ_ITEMS, listenReadItems)
}